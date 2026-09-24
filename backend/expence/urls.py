from django.urls import path
from . import views
urlpatterns = [
    path('signup/',views.Signup,name="signup"),
    path('Login/',views.Login,name="Login"),
    path('addExpense/',views.addExpense,name="addExpense"),
    path('manageExpense/<int:userId>/',views.manageExpense,name="manageExpense"),
    path('editExpense/<int:id>/',views.editExpense,name="editExpense"),
    path('deleteExpense/<int:id>/',views.deleteExpense,name="deleteExpense"),
    path('searchExpense/<int:id>/',views.searchExpense,name="searchExpense"),
    path('changePassword/<int:id>/',views.changePassword,name="changePassword")
]
