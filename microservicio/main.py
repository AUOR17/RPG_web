import os
import jwt
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String, update
from sqlalchemy.future import select

app = FastAPI(title="Motor kanban")

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],  # -> esto en produccion es el link de la pagina
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

DB_USER = os.getenv("POSTGRES_USER", "admin_gremio")
DB_PASS = os.getenv("POSTGRES_PASSWORD", "superpassword123")
DB_NAME = os.getenv("POSTGRES_DB", "gremio_db")
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "tu_secreto")
POSTGRES_HOST = os.getenv("POSTGRES_HOST",None)

# Construccion de la URL pra conectarse a una base de datos
# dialecto+driver://usuario:contraseña@host:puerto/nombre_base_de_datos

DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{POSTGRES_HOST}:5432/{DB_NAME}"
engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

class AventureroDB(Base):
    __tablename__ = "gremio_aventurero"
    id = Column(Integer, primary_key=True, index=True)
    estado = Column(String(20))

class MovimientoKanban(BaseModel):
    nuevo_estado: str

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

def verificar_jwt(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="El token ha expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token invalido")
    
@app.patch("/api/kanban/move/{aventurero_id}")
async def mover_aventurero(
    aventurero_id: int,
    movimiento: MovimientoKanban, 
    db: AsyncSession=Depends(get_db),
    usuario_valido: dict = Depends(verificar_jwt)
):
    estados_permitidos = ["Disponible", "En Mision", "Enfermeria", "Muerto"]

    if movimiento.nuevo_estado not in estados_permitidos:
        raise HTTPException(status_code=400, detail="Estado no permitido en el gremio")
    
    query = (
        update(AventureroDB)
        .where(AventureroDB.id == aventurero_id)
        .values(estado = movimiento.nuevo_estado)
    )
    result = await db.execute(query)
    await db.commit

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Aventurero no econtrado")
    
    return {"mensaje":"Movimiento exitoso", "id": aventurero_id, "estado": movimiento.nuevo_estado}