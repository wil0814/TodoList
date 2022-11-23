package user

import (
	"errors"
	"fmt"
	"todo-list/database"
)

func CreateUser(user User) error {
	result := database.DBconnect.First(&user, "user_name = ?", user.UserName)
	if result.RowsAffected != 0 {
		return errors.New("此帳號已經有人使用，請換一組帳號")
	}
	result = database.DBconnect.Create(&user)
	fmt.Println("create")
	if result.Error != nil {
		fmt.Println("create error")
		return result.Error
	}
	return nil
}
