package main

import (
	DBconnect "todo-list/database"
	"todo-list/router"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowMethods = []string{"GET", "POST", "DELETE", "OPTIONS", "PUT", "PATCH"}
	corsConfig.AllowHeaders = []string{"Authorization", "Content-Type", "Upgrade", "Origin",
		"Connection", "Accept-Encoding", "Accept-Language", "Host"}
	r.Use(cors.New(corsConfig))
	router.Router(r)
	go func() {
		DBconnect.DB()
	}()
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
