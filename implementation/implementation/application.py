# API based on CS50 Finance PSET
import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request
import json
import random

# Configure application
app = Flask(__name__)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///academy.db")

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/learn")
def learn():
    return render_template("learn.html")

@app.route("/lesson")
def lesson():
    return render_template("lesson.html")

@app.route("/quiz")
def quiz():

    # Get between 5 and 10 random questions from dictionary, set quiz number to 1
    questions = random.randint(5, 10)
    q = db.execute("SELECT english, assyrian FROM dictionary ORDER BY RANDOM() LIMIT ?", questions)
    v = 1
    information = {"quiz":q, "qnumVal":v}
    return render_template("quiz.html", information = information)
