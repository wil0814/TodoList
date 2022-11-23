package database

import (
	"fmt"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DBconnect *gorm.DB
var err error

func DB() {
	dns := "root:todoroot@tcp(127.0.0.1:3306)/todolist?charset=utf8mb4&parseTime=True&loc=Local"
	DBconnect, err = gorm.Open(mysql.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("db connect")
}
