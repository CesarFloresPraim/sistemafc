from django.urls import path, include
from . import views

urlpatterns = [
    path('employee/', views.EmployeeView.as_view(), name="employeePost"),
    path('employee/<int:id>', views.EmployeeView.as_view(), name="employee"),
    path('employees/', views.EmployeeListView.as_view(), name="employees"),
    path('employeesForRegister/', views.EmployeeForRegisterListView.as_view(),
         name="employeesForRegister"),
    path('departments/', views.DepartmentListView.as_view(), name="departments"),
    path('initializeRegister/', views.InitializeRegisterRHView.as_view(),
         name="initializeRegister"),
    path('registerRH/<int:id>', views.RegisterRHView.as_view(), name="registerRH"),
    path('registerList/', views.RegisterListView.as_view(), name="registerList"),

]

