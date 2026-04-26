import { Request,Response } from "express"
import bcrypt from "bcrypt"
import { registerUser,findUserByEmail } from "../services/authService"
import { generateToken } from "../utils/jwt"

export const register = async (req:Request,res:Response) => {

  try{

    const {name,email,password,role} = req.body

    const user = await registerUser(name,email,password,role)

    res.json({
      message:"User created",
      user
    })

  }catch(err){

    res.status(500).json({error:"Registration failed"})
  }

}

export const login = async (req:Request,res:Response) => {

  try{

    const {email,password} = req.body

    const user = await findUserByEmail(email)

    if(!user){
      return res.status(400).json({message:"Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(password,user.password_hash)

    if(!isMatch){
      return res.status(400).json({message:"Invalid credentials"})
    }

    const token = generateToken(user)

    res.json({
      token
    })

  }catch(err){

    res.status(500).json({error:"Login failed"})
  }

}