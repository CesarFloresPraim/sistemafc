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
    path('perceptionTypeList/', views.PerceptionTypeListView.as_view(),
         name="perceptionTypeList"),
    path('perceptionType/', views.PerceptionTypeView.as_view(),
         name="perceptionTypePost"),
    path('perceptionType/<int:id>',
         views.PerceptionTypeView.as_view(), name="perceptionType"),
    path('perceptionList/', views.PerceptionListView.as_view(),
         name="perceptionList"),
    path('employeePerceptionList/', views.EmployeePerceptionListView.as_view(),
         name="employeePerceptionList"),
    path('perception/', views.PerceptionView.as_view(), name="perceptionPost"),
    path('perception/<int:id>', views.PerceptionView.as_view(), name="perception"),

    path('deductionTypeList/', views.DeductionTypeListView.as_view(),
         name="deductionTypeList"),
    path('deductionType/', views.DeductionTypeView.as_view(),
         name="deductionTypePost"),
    path('deductionType/<int:id>',
         views.DeductionTypeView.as_view(), name="deductionType"),
    path('deductionList/', views.DeductionListView.as_view(),
         name="deductionList"),
    path('employeeDeductionList/', views.EmployeeDeductionListView.as_view(),
         name="employeeDeductionList"),
    path('deduction/', views.DeductionView.as_view(), name="deductionPost"),
    path('deduction/<int:id>', views.DeductionView.as_view(), name="deduction"),


]
