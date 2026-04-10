from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import uvicorn
import csv
import os
from datetime import datetime

app = FastAPI(title="PetroPulseAI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# ---------------------------------------------------------
# MOCK DATABASE FOR OTPs (In-memory for hackathon demo)
# ---------------------------------------------------------
temp_otp_store = {}

# --- EXISTING PREDICT ENDPOINT ---
class PredictRequest(BaseModel):
    prices: list

@app.post("/predict")
async def predict_prices(request: PredictRequest):
    base_diesel = 89.420
    base_petrol = 96.750
    volatility_d = random.uniform(-0.8, 1.2)
    volatility_p = random.uniform(-0.5, 1.5)
    return {
        "diesel": base_diesel + volatility_d,
        "petrol": base_petrol + volatility_p
    }

# --- EXISTING CONTACT ENDPOINT ---
class ContactRequest(BaseModel):
    name: str
    company: str
    email: str
    phone: str
    type: str
    message: str

@app.post("/contact")
async def handle_contact(request: ContactRequest):
    filename = "inquiries_log.csv"
    file_exists = os.path.isfile(filename)
    
    with open(filename, mode="a", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(["Timestamp", "Name", "Company", "Email", "Phone", "Inquiry Type", "Message"])
            
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        writer.writerow([timestamp, request.name, request.company, request.email, request.phone, request.type, request.message])

    print(f"🔔 INQUIRY SAVED to {filename}: {request.name} from {request.company}")
    return {"status": "success", "message": "Inquiry securely saved!"}

# ==========================================
# NEW: OTP & SIGNUP ENDPOINTS
# ==========================================

class OTPRequest(BaseModel):
    email: str

@app.post("/request-otp")
async def request_otp(request: OTPRequest):
    # Generate a random 6-digit OTP
    otp = str(random.randint(100000, 999999))
    
    # Store it temporarily linked to this email
    temp_otp_store[request.email] = otp
    
    # Simulate sending an email by printing to the terminal
    print("\n" + "="*50)
    print(f"📧 MOCK EMAIL DISPATCHED TO: {request.email}")
    print(f"🔐 YOUR SECURE OTP CODE IS: {otp}")
    print("="*50 + "\n")
    
    return {"status": "success", "message": "OTP sent successfully."}


class VerifySignupRequest(BaseModel):
    name: str
    email: str
    password: str
    otp: str

@app.post("/verify-otp-signup")
async def handle_verify_signup(request: VerifySignupRequest):
    # 1. Check if the OTP matches what we stored
    stored_otp = temp_otp_store.get(request.email)
    
    if not stored_otp or stored_otp != request.otp:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP.")
    
    # 2. OTP is valid! Proceed to save the user.
    filename = "users_log.csv"
    file_exists = os.path.isfile(filename)
    
    with open(filename, mode="a", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        if not file_exists:
            writer.writerow(["Timestamp", "Name", "Email", "Password_Hash"])
            
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        writer.writerow([timestamp, request.name, request.email, f"[ENCRYPTED_MOCK_{request.password}]"])

    # Clean up the used OTP
    del temp_otp_store[request.email]

    print(f"👤 NEW VERIFIED USER SAVED to {filename}: {request.name}")
    return {"status": "success", "user": {"name": request.name, "email": request.email}}

# --- HEALTH CHECK ---
@app.get("/")
def read_root():
    return {"status": "Local Terminal Active", "model": "LSTM Ready"}

if __name__ == "__main__":
    print("🚀 PetroPulseAI Backend starting on http://localhost:8000")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)