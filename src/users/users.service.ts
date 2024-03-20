import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [{ "id": 1, "first_name": "Basile", "last_name": "Sycamore", "email": "bsycamore0@guardian.co.uk", "role": "Admin" },
    { "id": 2, "first_name": "Burtie", "last_name": "Cooper", "email": "bcooper1@stumbleupon.com", "role": "User" },
    { "id": 3, "first_name": "Sidney", "last_name": "Coggeshall", "email": "scoggeshall2@mapy.cz", "role": "User" },
    { "id": 4, "first_name": "Corbet", "last_name": "McGenis", "email": "cmcgenis3@yellowbook.com", "role": "User" }]

    findAll(role?: 'Admin' | 'User') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('User Not Found')
            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (!user) throw new NotFoundException('User not found')
        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto }
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
