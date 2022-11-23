package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type User struct {
	UserName     string `json:"UserName" binding:"required,gt=5,lt=13"`
	UserPassword string `json:"PassWord" binding:"required,gt=5,lt=21"`
}

func CreateUserService(c *gin.Context) {
	user := User{}
	err := c.ShouldBindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, "error"+err.Error())
		return
	}
	err = CreateUser(user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"user success": "good",
		})
	}
}
