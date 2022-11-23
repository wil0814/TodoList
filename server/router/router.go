package router

import (
	"net/http"
	"todo-list/middleware"
	"todo-list/todo"
	"todo-list/user"

	"github.com/gin-gonic/gin"
)

func Router(r *gin.Engine) {

	r.POST("/login", middleware.CreateAuth)
	r.GET("/user", middleware.AuthRequired,
		func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"success": true,
			})
		},
	)
	r.POST("/createuser", user.CreateUserService)
	list := r.Group("/list")
	list.Use(middleware.AuthRequired)
	list.GET("/allList", todo.AllList)
	list.POST("/createList", todo.CreateList)
	list.PATCH("/changeStatus", todo.ChangeStatus)
	list.PATCH("/changeList", todo.ChangeList)
	list.DELETE("/deleteList", todo.DeleteList)
}
