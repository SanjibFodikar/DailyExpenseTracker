from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import *

# signup api
@csrf_exempt
def Signup(request):
    if request.method=="POST":
        data=json.loads(request.body)
        fullName=data.get('FullName')
        email=data.get('Email')
        password=data.get('Password')

        if UserDetails.objects.filter(Email=email).exists():
            return JsonResponse({'message':'email already exists'},status=400)
        UserDetails.objects.create(
            FullName=fullName,
            Email=email,
            Password=password
        )
        return JsonResponse({'message':'user registered successfully'},status=201)

# login api
@csrf_exempt
def Login(request):
    if request.method=="POST":
        data=json.loads(request.body)
        email=data.get('Email')
        password=data.get('Password')
        try:
            user = UserDetails.objects.get(Email=email,Password=password)
            return JsonResponse({
                'message':"Login Successfully",
                'userId':user.id,
                'userName':user.FullName
            },status=200)
        except Exception as e:
            return JsonResponse({'message':'Invalid Credentials'},status=400)
        
@csrf_exempt
def addExpense(request):
    if request.method=="POST":
      data=json.loads(request.body)
      expenceDate=data.get('ExpenceDate')
      expenseItem=data.get('ExpenseItem')
      expenseCost=data.get('ExpenseCost')
      userId=data.get('UserId')
      user=UserDetails.objects.get(id=userId)
      try:
          Expense.objects.create(
              userId=user,
              ExpenceDate=expenceDate,
              ExpenseItem=expenseItem,
              ExpenseCost=expenseCost
          )
          return JsonResponse({
              'message':'Expense Added Successfully'
          },status=201)
      except Exception as e:
          return JsonResponse({
              'message':'Something went wrong ! Please Try Again'
          },status=401)

def manageExpense(request,userId):
    if request.method=='GET':
       ExpenseDetails=Expense.objects.filter(userId_id=userId).values()
       expense=list(ExpenseDetails)
       return JsonResponse(expense,safe=False)

@csrf_exempt
def editExpense(request,id):
    if request.method=="PUT":
        expenseData=Expense.objects.select_related('userId').get(id=id)
        data=json.loads(request.body)
        expenceDate=data.get('ExpenceDate')
        expenseItem=data.get('ExpenseItem')
        expenseCost=data.get('ExpenseCost')
        try:
            expenseData.ExpenceDate=expenceDate
            expenseData.ExpenseItem=expenseItem
            expenseData.ExpenseCost=expenseCost
            expenseData.save()
            return JsonResponse({
                'message':"ok"
            },status=200)
        except Exception as e:
            return JsonResponse({'message':"not ok"},status=400)

@csrf_exempt
def deleteExpense(request,id):
    if request.method=="DELETE":
        try:
            expense=Expense.objects.select_related('userId').get(id=id)
            expense.delete()
            return JsonResponse({'message':"deleted succssfully"},status=200)
        except Exception as e:
            return JsonResponse({'message':"Expenese not found"},status=400)

from django.db.models import Sum
def searchExpense(request,id):
    fromDate=request.GET.get('from')
    toDate=request.GET.get('to')
    expenses=Expense.objects.filter(userId_id=id,ExpenceDate__range=[fromDate,toDate])
    agg=expenses.aggregate(Sum('ExpenseCost'))   # {'ExpenseCost__sum':total}
    total=agg['ExpenseCost__sum'] or 0
    return JsonResponse({
        'expenses':list(expenses.values()),
        'total':total
    })

@csrf_exempt
def changePassword(request,id):
    if request.method=="POST":
        data=json.loads(request.body)
        Email=data.get('Email')
        newPassword=data.get('newPassword')
        user=UserDetails.objects.filter(id=id,Email=Email).first()
        if not user:
           return JsonResponse({
               'message':"Invalid Credentials"
           },status=400)

        user.Password=newPassword
        user.save()
        return JsonResponse({
            'message':"Password Updated Successfully"
        },status=200)
        
