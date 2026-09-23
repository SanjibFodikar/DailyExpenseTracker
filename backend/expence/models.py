from django.db import models

# Create your models here.
class UserDetails(models.Model):
    FullName=models.CharField(max_length=100)
    Email=models.EmailField()
    Password=models.CharField(max_length=50)
    RegDate=models.DateTimeField(auto_now_add=True)

class Expense(models.Model):
    userId=models.ForeignKey(UserDetails,on_delete=models.CASCADE)
    ExpenceDate=models.DateField(null=True,blank=True)
    ExpenseItem=models.CharField(max_length=100)
    ExpenseCost=models.CharField(max_length=100)
    NotDate=models.DateTimeField(auto_now_add=True)