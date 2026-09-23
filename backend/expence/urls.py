from django.urls import path
from . import views
urlpatterns = [
    path('signup/',views.Signup,name="signup"),
    path('Login/',views.Login,name="Login"),
    path('addExpense/',views.addExpense,name="addExpense"),
    path('manageExpense/<int:userId>/',views.manageExpense,name="manageExpense"),
    path('editExpense/<int:id>/',views.editExpense,name="editExpense")
]
