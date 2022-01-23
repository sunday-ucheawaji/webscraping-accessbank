from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from app.auth import AuthHandler
from app.schemas import UserSchema, UserLoginSchema, ScraperSchema
from app.run import runner
from app.database import (
    fetch_all_users,
    fetch_one_user,
    create_user,
    update_password,
    delete_user
)

app = FastAPI()
users = []
auth_handler = AuthHandler()

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=['*'],
    allow_methods=['*'],
)


# FETCH ALL USERS
@app.get("/api/users", tags=["users"])
async def get_users(secure_routed=Depends(auth_handler.auth_wrapper)):
    all_users = await fetch_all_users()
    return all_users


# FETCH ONE USER
@app.get("/api/users/{email}", response_model=UserSchema, tags=["users"])
async def get_one_user(email, secured_route=Depends(auth_handler.auth_wrapper)):
    user = await fetch_one_user(email)
    if user:
        return user
    raise HTTPException(400, "Bad Request")


# CHANGE PASSWORD
@app.put("/api/users/changepassword", tags=["users"])
async def update_user_password(user: UserLoginSchema = Body(default=None), secured_route=Depends(auth_handler.auth_wrapper)):
    hashed_password = auth_handler.get_password_hash(user.password)
    response = await update_password(user.email, hashed_password)
    if response:
        return response
    raise HTTPException(400, "Bad Request")


# DELETE A USER
@app.delete("/api/users/{email}", tags=["users"])
async def remover_user(email, secure_routed=Depends(auth_handler.auth_wrapper)):
    response = await delete_user(email)
    if response:
        return {"message": "User deleted successfully"}
    raise HTTPException(400, "Bad Request")


# REGISTERS A USER
@app.post("/api/register", status_code=201, response_model=UserSchema, tags=["users"])
async def register(user: UserSchema = Body(default=None)):
    allusers = await fetch_all_users()
    for each_user in allusers:
        if each_user.email == user.email:
            raise HTTPException(
                status_code=400, detail="This email already exist")
    hashed_password = auth_handler.get_password_hash(user.password)
    response = await create_user({
        'fullname': user.fullname,
        'email': user.email,
        "password": hashed_password
    })
    if response:
        res = {'fullname': response['fullname'], 'email': response['email']}
        return res
    raise HTTPException(400, "Bad Request")


# LOGIN A USER
@app.post("/api/login", tags=["users"])
async def login(user_login: UserLoginSchema = Body(default=None)):
    user = None
    all_users = await fetch_all_users()
    for each_user in all_users:
        if each_user.email == user_login.email:
            user = each_user
            break
    if (user is None) or (not auth_handler.verify_password(user_login.password, user.password)):
        raise HTTPException(
            status_code=401, detail="Invalid email and/or password")
    token = auth_handler.encode_token(user.email)
    return {'token': token}


@app.post("/api/scraper")
async def my_runner( scraper:ScraperSchema = Body(default=None), secure_routed=Depends(auth_handler.auth_wrapper)):
    result = runner(scraper.username, scraper.password)
    return result
