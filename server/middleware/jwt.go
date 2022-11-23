package middleware

import (
	"fmt"
	"net/http"
	"strconv"
	"time"
	"todo-list/database"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

type Claims struct {
	Account string `json:"account"`
	Role    string `json:"role"`
	jwt.StandardClaims
}

// jwt secret key
var jwtSecret = []byte("password")

func CreateAuth(c *gin.Context) {
	// validate request body
	type user struct {
		Account  string
		Password string
	}
	var body user
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "need to be json",
		})
		return
	}

	//check Account Password correct
	result := database.DBconnect.Where("user_name = ? AND user_password =?", body.Account, body.Password).Take(&body)
	fmt.Println(result.RowsAffected)
	success := result.RowsAffected

	if success != 0 {
		now := time.Now()
		jwtId := body.Account + strconv.FormatInt(now.Unix(), 10)
		role := "william"

		//set claims and sign
		claims := Claims{
			Account: body.Account,
			Role:    role,
			StandardClaims: jwt.StandardClaims{
				Audience:  body.Account,
				ExpiresAt: now.Add(2000 * time.Second).Unix(),
				Id:        jwtId,
				IssuedAt:  now.Unix(),
				Issuer:    "ginJWT",
				NotBefore: now.Add(0 * time.Second).Unix(),
				Subject:   body.Account,
			},
		}
		tokenClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		token, err := tokenClaims.SignedString(jwtSecret)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"token": token,
			"ok":    1,
		})
		return
	}
	c.JSON(http.StatusUnauthorized, gin.H{
		"message": "Unauthorized",
	})
}

func AuthRequired(c *gin.Context) {
	token := c.GetHeader("Authorization")
	// fmt.Println("token:", token)
	tokenClaims, err := jwt.ParseWithClaims(token, &Claims{},
		func(token *jwt.Token) (i interface{}, err error) {
			return jwtSecret, nil
		},
	)
	fmt.Println("token:", tokenClaims)
	if err != nil {
		var message string
		if ve, ok := err.(*jwt.ValidationError); ok {
			if ve.Errors&jwt.ValidationErrorMalformed != 0 {
				message = "token is malformed"
			} else if ve.Errors&jwt.ValidationErrorUnverifiable != 0 {
				message = "token could not be verified because of signing problems"
			} else if ve.Errors&jwt.ValidationErrorSignatureInvalid != 0 {
				message = "signature validation failed"
			} else if ve.Errors&jwt.ValidationErrorExpired != 0 {
				message = "token is expired"
			} else if ve.Errors&jwt.ValidationErrorNotValidYet != 0 {
				message = "token is not yet valid before sometime"
			} else {
				message = "can not handle this token"
			}
		}
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": message,
		})
		c.Abort()
		return
	}
	if claims, ok := tokenClaims.Claims.(*Claims); ok && tokenClaims.Valid {
		// fmt.Println("account:", claims.Account)
		// fmt.Println("role:", claims.Role)
		c.Set("account", claims.Account)
		c.Set("role", claims.Role)
		c.Next()
		return
	} else {
		c.Abort()
		return
	}
}
