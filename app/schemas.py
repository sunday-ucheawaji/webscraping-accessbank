from pydantic import BaseModel, Field, EmailStr


class UserSchema(BaseModel):
    fullname: str = Field(default=None)
    email: EmailStr = Field(default=None)
    password: str = Field(default=None)

    class Config:
        the_schema = {
            "user reg demo": {
                "fullname": "John Doe",
                "email": "johndoe@gmail.com",
                "password": "password123"
            }
        }


class UserLoginSchema(BaseModel):
    email: EmailStr = Field(default=None)
    password: str = Field(default=None)

    class Config:
        the_schema = {
            "user login  demo": {
                "email": "johndoe@gmail.com",
                "password": "password123"
            }
        }

class ScraperSchema(BaseModel):
    username: str = Field(default=None)
    password: str = Field(default=None)

    class Config:
        the_schema = {
            "user scraper  demo": {
                "username": "John Doe",
                "password": "password123"
            }
        }