package todo

import (
	"fmt"
	"net/http"
	"todo-list/database"

	"github.com/gin-gonic/gin"
)

type List struct {
	ListId   string `json:"ID"`
	UserName string `json:"UserName" binding:"required,gt=5,lt=13"`
	List     string `json:"List" `
	Status   string `json:"Status" `
}

func AllList(c *gin.Context) {
	userName, _ := c.Get("account")

	List := []List{}

	database.DBconnect.Find(&List, "user_name=?", userName)
	c.JSON(http.StatusOK, gin.H{
		"username": userName,
		"AllList":  List,
	})

}

func ChangeStatus(c *gin.Context) {
	var changeList List
	err := c.ShouldBindJSON(&changeList)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "need to be json",
		})
	}
	database.DBconnect.Model(&changeList).Where("list_id = ?", changeList.ListId).Update("status", "success")
	c.JSON(http.StatusOK, gin.H{
		"status": "success to change list status",
	})
}

func DeleteList(c *gin.Context) {
	var deleteList List
	err := c.ShouldBindJSON(&deleteList)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "need to be json",
		})
		return
	} else {
		database.DBconnect.Delete(&deleteList, &deleteList.ListId)
		c.JSON(http.StatusOK, gin.H{
			"status": "success delete list",
		})
	}
}

func ChangeList(c *gin.Context) {
	var changeList List
	err := c.ShouldBindJSON(&changeList)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "need to be json",
		})
		return
	} else {
		database.DBconnect.Model(&changeList).Where("list_id = ?", changeList.ListId).Update("list", &changeList.List)
		c.JSON(http.StatusOK, gin.H{
			"status": "success to change list",
		})
	}
}

func CreateList(c *gin.Context) {
	var createList List
	err := c.ShouldBindJSON(&createList)
	createList.Status = "open"
	fmt.Println(createList)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "need to be json",
		})
		return
	} else {
		database.DBconnect.Omit("list_id").Create(&createList)
		c.JSON(http.StatusOK, gin.H{
			"status": "success to change list",
		})
	}
}
