/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Empty } from './google/protobuf/empty.pb';

export const protobufPackage = 'hr';

export interface GetEmployeeRequest {
    id: number;
}

export interface GetEmployeeResponse {
    id: number;
    name: string;
    surname: string;
    secondName: string;
    sex: boolean;
    address: string;
    phone: string;
    marriageId: number;
    militaryId: number;
    statusId: number;
    userId: number;
    employeeAddId: number;
}

export interface GetEmployeesResponse {
    employees: GetEmployeeResponse[];
}

export interface CreateEmployeeRequest {
    name: string;
    surname: string;
    secondName: string;
    sex: boolean;
    address: string;
    phone: string;
    marriageId: number;
    militaryId: number;
    statusId: number;
    userId: number;
    employeeAddId: number;
}

export interface CreateEmployeeResponse {
    employee: GetEmployeeResponse;
}

export interface GetEmployeeAdditionRequest {
    id: number;
}

export interface GetEmployeeAdditionResponse {
    id: number;
    departmentId: number;
    positionId: number;
    levelId: number;
    headId: number;
    contractId: number;
    workFormatId: number;
    medCertStatus: number;
    salaryAfterProbation: string;
    startDate: Date;
    periodProbation: Date;
}
export interface GetEmployeeAdditionsResponse {
    employeeAdditions: GetEmployeeAdditionResponse[];
}

export interface CreateEmployeeAdditionRequest {
    departmentId: number;
    positionId: number;
    levelId: number;
    headId: number;
    contractId: number;
    workFormatId: number;
    medCertStatus: number;
    salaryAfterProbation: string;
    startDate: Date;
    periodProbation: Date;
}

export interface CreateEmployeeAdditionResponse {
    employeeAddition: GetEmployeeAdditionResponse;
}

export const HR_PACKAGE_NAME = 'hr';

export interface HrServiceClient {
    getEmployee(request: GetEmployeeRequest): Observable<GetEmployeeResponse>;

    getEmployees(request: Empty): Observable<GetEmployeesResponse>;

    createEmployee(
        request: CreateEmployeeRequest,
        rest: any,
    ): Observable<CreateEmployeeResponse>;

    getEmployeeAdditions(
        request: GetEmployeeAdditionRequest,
    ): Observable<GetEmployeeAdditionsResponse>;

    createEmployeeAddition(
        request: CreateEmployeeAdditionRequest,
        rest: any,
    ): Observable<CreateEmployeeAdditionResponse>;
}

export interface HrServiceController {
    getEmployee(
        request: GetEmployeeRequest,
    ):
        | Promise<GetEmployeeResponse>
        | Observable<GetEmployeeResponse>
        | GetEmployeeResponse;

    getEmployees(
        request: Empty,
    ):
        | Promise<GetEmployeesResponse>
        | Observable<GetEmployeesResponse>
        | GetEmployeesResponse;

    createEmployee(
        request: CreateEmployeeRequest,
    ):
        | Promise<CreateEmployeeResponse>
        | Observable<CreateEmployeeResponse>
        | CreateEmployeeResponse;

    getEmployeeAdditions(
        request: GetEmployeeAdditionRequest,
    ):
        | Promise<GetEmployeeAdditionsResponse>
        | Observable<GetEmployeeAdditionsResponse>
        | GetEmployeeAdditionsResponse;

    createEmployeeAddition(
        request: CreateEmployeeAdditionRequest,
    ):
        | Promise<CreateEmployeeAdditionResponse>
        | Observable<CreateEmployeeAdditionResponse>
        | CreateEmployeeAdditionResponse;
}

export function HrServiceControllerMethods() {
    return function (constructor: Function) {
        const grpcMethods: string[] = [
            'getEmployee',
            'getEmployees',
            'createEmployee',
            'getEmployeeAdditions',
            'createEmployeeAddition',
        ];
        for (const method of grpcMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(
                constructor.prototype,
                method,
            );
            GrpcMethod('HrService', method)(
                constructor.prototype[method],
                method,
                descriptor,
            );
        }
        const grpcStreamMethods: string[] = [];
        for (const method of grpcStreamMethods) {
            const descriptor: any = Reflect.getOwnPropertyDescriptor(
                constructor.prototype,
                method,
            );
            GrpcStreamMethod('HrService', method)(
                constructor.prototype[method],
                method,
                descriptor,
            );
        }
    };
}

export const HR_SERVICE_NAME = 'HrService';
