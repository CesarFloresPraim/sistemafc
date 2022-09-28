from django.urls import path, include
from . import views

urlpatterns = [
    path('employee/', views.EmployeeView.as_view(), name="employeePost"),
    path('employee/<int:id>', views.EmployeeView.as_view(), name="employee"),
    path('employees/', views.EmployeeListView.as_view(), name="employees"),
    path('departments/', views.DepartmentListView.as_view(), name="employees"),

]
