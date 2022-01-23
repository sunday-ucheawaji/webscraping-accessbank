from app.schemas import UserSchema

# mongodb
import motor.motor_asyncio

# This is mainly for the connection between Database.py and mongoDB
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')

# Database Connection/Creation
database = client.UserList

collection = database.users


async def fetch_all_users():
    users = []
    cursor = collection.find({})
    async for document in cursor:
        users.append(UserSchema(**document))
    return users


async def fetch_one_user(email):
    document = await collection.find_one({'email': email})
    return document


async def create_user(user):
    document = user
    result = await collection.insert_one(user)
    return document


async def update_password(email, password):
    await collection.update_one({'email': email}, {"$set": {"password": password}})
    return {"message": "Password updated successfully"}


async def delete_user(email):
    await collection.delete_one({'email': email})
    return True
