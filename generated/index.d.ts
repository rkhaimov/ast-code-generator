export interface IHashMap<THashType = any> {
    [key: string]: THashType;
}
export interface IDataSource {
    get(url: string): Promise<any>;
    post(url: string, body?: unknown): Promise<any>;
    put(url: string, body?: unknown): Promise<any>;
    delete(url: string): Promise<any>;
    fillPath(url: string, payload: IHashMap): string;
    toQuery(payload: IHashMap): string;
    pick(payload: IHashMap, keys: string[]): IHashMap;
    getProperty(payload: IHashMap, key: string): any;
}
export declare class DefaultDataSource implements IDataSource {
    get(url: string): Promise<unknown>;
    delete(url: string): Promise<unknown>;
    post(url: string, body: unknown): Promise<unknown>;
    put(url: string, body: unknown): Promise<unknown>;
    fillPath(url: string, payload: IHashMap): string;
    pick(payload: IHashMap, keys: string[]): IHashMap;
    toQuery(payload: IHashMap): string;
    getProperty(payload: IHashMap, key: string): any;
    protected send(url: string, method: string, data?: unknown): Promise<unknown>;
}
export declare class RepositoryBase {
    source: IDataSource;
}
export declare const configureSource: (source: IDataSource) => void;
export interface IAccountInfo {
    userName: string;
    firstName: string;
    lastName: string;
}
export interface ISignInRequestModel {
    user: string;
    password: string;
}
export interface ISignInResponseModel {
    success: boolean;
    resultCode: "Success" | "InvalidLoginOrPassword";
    accessToken: string;
    refreshToken: string;
}
export interface IAgreementModel {
    taskType: "AllTasks" | "Unknown" | "Vacation" | "Outsourcing" | "Overtime" | "Agreement" | "PaymentRequest";
    initiator: string;
    deadline: string;
    status: string;
    id: number;
    title: string;
    created: string;
    creatorEmail: string;
    creatorFirstName: string;
    creatorLastName: string;
    modified: string;
    editor: string;
    assignedTo: string;
}
export interface ITaskCountModel {
    kind: "AllTasks" | "Unknown" | "Vacation" | "Outsourcing" | "Overtime" | "Agreement" | "PaymentRequest";
    count: number;
}
export interface IDetailsAgreementModel {
    taskType: "AllTasks" | "Unknown" | "Vacation" | "Outsourcing" | "Overtime" | "Agreement" | "PaymentRequest";
    company: string;
    signer: string;
    signerEmail: string;
    note: string;
    initiator: string;
    iniciatorEmail: string;
    departmentBoss: string;
    departmentBossEmail: string;
    deadLine: string;
    afterAgreement: string;
    isSignAndSend: boolean;
    sendAddress: string;
    status: string;
    commentary: string;
    leadURL: string;
    agreementNo: string;
    docId: string;
    agreementType: string;
    department: string;
    receiveDate: string;
    project: string;
    contractDate: string;
    counterparty: string;
    currency: string;
    isRegisrty: boolean;
    isSendToAgreement: boolean;
    amount: string;
    paymentPlan: boolean;
    paymentStartDate: string;
    paymentEndDate: string;
    contractType: string;
    mainAgreement: string;
    attachments: IAttachment[];
    agreementTitle: string;
    agreementStatus: string;
    assignedToEmail: string;
    agreementId: number;
    editorEmail: string;
    id: number;
    title: string;
    created: string;
    creatorEmail: string;
    creatorFirstName: string;
    creatorLastName: string;
    modified: string;
    editor: string;
    assignedTo: string;
}
export interface IAttachment {
    fileName: string;
    linkUrl: string;
}
export interface ITaskOutcome {
    name: string;
    description: string;
}
export interface ITaskParticipant {
    title: string;
    userName: string;
    position: string;
    email: string;
}
export interface IDelegateTaskModel {
    userName: string;
    comments: string;
}
export interface IProcessingTaskModel {
    outcomeName: string;
    comments: string;
}
export interface IOutsourcingJob {
    taskType: "AllTasks" | "Unknown" | "Vacation" | "Outsourcing" | "Overtime" | "Agreement" | "PaymentRequest";
    workflowName: string;
    id: number;
    title: string;
    created: string;
    creatorEmail: string;
    creatorFirstName: string;
    creatorLastName: string;
    modified: string;
    editor: string;
    status: string;
    assignedTo: string;
}
export interface IProcessingJobTaskModel {
    hours: number;
    outcomeName: string;
    comments: string;
}
export interface IOvertimeJob {
    taskType: "AllTasks" | "Unknown" | "Vacation" | "Outsourcing" | "Overtime" | "Agreement" | "PaymentRequest";
    workflowName: string;
    id: number;
    title: string;
    created: string;
    creatorEmail: string;
    creatorFirstName: string;
    creatorLastName: string;
    modified: string;
    editor: string;
    status: string;
    assignedTo: string;
}
export interface IPaymentRequest {
    payUntilDate: string;
    budgetCode: string;
    currencyCode: string;
    supplier: string;
    paymentMethod: string;
    invNo: string;
    amount: number;
    taskType: "AllTasks" | "Unknown" | "Vacation" | "Outsourcing" | "Overtime" | "Agreement" | "PaymentRequest";
    id: number;
    title: string;
    created: string;
    creatorEmail: string;
    creatorFirstName: string;
    creatorLastName: string;
    modified: string;
    editor: string;
    status: string;
    assignedTo: string;
}
export interface ITaskModel {
    id: number;
    taskType: "AllTasks" | "Unknown" | "Vacation" | "Outsourcing" | "Overtime" | "Agreement" | "PaymentRequest";
    title: string;
    created: string;
    creatorEmail: string;
    creatorFirstName: string;
    creatorLastName: string;
    modified: string;
    editor: string;
}
export interface IAppUser {
    userName: string;
    surname: string;
    password: string;
}
export interface IUserListItem {
    firstName: string;
    lastName: string;
    email: string;
}
export interface IVacation {
    taskType: "AllTasks" | "Unknown" | "Vacation" | "Outsourcing" | "Overtime" | "Agreement" | "PaymentRequest";
    id: number;
    title: string;
    created: string;
    creatorEmail: string;
    creatorFirstName: string;
    creatorLastName: string;
    modified: string;
    editor: string;
    status: string;
    assignedTo: string;
}
export declare class AccountRepositoryClass extends RepositoryBase {
    account(): Promise<IAccountInfo>;
    signin(payload: {
        request?: ISignInRequestModel;
    }): Promise<ISignInResponseModel>;
    refresh(): Promise<ISignInResponseModel>;
    logout(): Promise<void>;
}
export declare class AgreementRepositoryClass extends RepositoryBase {
    agreement(payload: {
        initiator?: string;
        deadlineFrom?: string;
        deadlineTo?: string;
        title?: string;
        createdFrom?: string;
        createdTo?: string;
        status?: string;
        assignedTo?: string;
    }): Promise<IAgreementModel[]>;
    list(payload: {
        initiator?: string;
        deadlineFrom?: string;
        deadlineTo?: string;
        title?: string;
        createdFrom?: string;
        createdTo?: string;
        status?: string;
        assignedTo?: string;
    }): Promise<IAgreementModel[]>;
    count(payload: {
        initiator?: string;
        deadlineFrom?: string;
        deadlineTo?: string;
        title?: string;
        createdFrom?: string;
        createdTo?: string;
        status?: string;
        assignedTo?: string;
    }): Promise<ITaskCountModel>;
    details(payload: {
        id: string;
    }): Promise<IDetailsAgreementModel>;
    outcomes(payload: {
        id: string;
    }): Promise<ITaskOutcome[]>;
    approvers(payload: {
        id: string;
    }): Promise<ITaskParticipant[]>;
    delegate(payload: {
        id: string;
        request?: IDelegateTaskModel;
    }): Promise<"Unavailable" | "Success" | "CannotObtainLock" | "InvalidUser" | "Failed" | "UndefinedError">;
    processing(payload: {
        id: string;
        request?: IProcessingTaskModel;
    }): Promise<"Unavailable" | "Success" | "CannotObtainLock" | "InvalidUser" | "Failed" | "UndefinedError">;
    ping(): Promise<string>;
}
export declare class LogRepositoryClass extends RepositoryBase {
    logger(): Promise<void>;
}
export declare class OutsourcingRepositoryClass extends RepositoryBase {
    outsourcing(payload: {
        taskName?: string;
        minDate?: string;
        maxDate?: string;
    }): Promise<IOutsourcingJob[]>;
    list(payload: {
        taskName?: string;
        minDate?: string;
        maxDate?: string;
    }): Promise<IOutsourcingJob[]>;
    count(payload: {
        taskName?: string;
        minDate?: string;
        maxDate?: string;
    }): Promise<ITaskCountModel>;
    details(payload: {
        id: string;
    }): Promise<IOutsourcingJob>;
    outcomes(payload: {
        id: string;
    }): Promise<ITaskOutcome[]>;
    approvers(payload: {
        id: string;
    }): Promise<ITaskParticipant[]>;
    delegate(payload: {
        id: string;
        request?: IDelegateTaskModel;
    }): Promise<"Unavailable" | "Success" | "CannotObtainLock" | "InvalidUser" | "Failed" | "UndefinedError">;
    processing(payload: {
        id: string;
        request?: IProcessingJobTaskModel;
    }): Promise<"Unavailable" | "Success" | "CannotObtainLock" | "InvalidUser" | "Failed" | "UndefinedError">;
    ping(): Promise<string>;
}
export declare class OvertimeRepositoryClass extends RepositoryBase {
    overtime(payload: {
        taskName?: string;
        minDate?: string;
        maxDate?: string;
    }): Promise<IOvertimeJob[]>;
    list(payload: {
        taskName?: string;
        minDate?: string;
        maxDate?: string;
    }): Promise<IOvertimeJob[]>;
    count(payload: {
        taskName?: string;
        minDate?: string;
        maxDate?: string;
    }): Promise<ITaskCountModel>;
    details(payload: {
        id: string;
    }): Promise<IOvertimeJob>;
    outcomes(payload: {
        id: string;
    }): Promise<ITaskOutcome[]>;
    approvers(payload: {
        id: string;
    }): Promise<ITaskParticipant[]>;
    delegate(payload: {
        id: string;
        request?: IDelegateTaskModel;
    }): Promise<"Unavailable" | "Success" | "CannotObtainLock" | "InvalidUser" | "Failed" | "UndefinedError">;
    processing(payload: {
        id: string;
        request?: IProcessingJobTaskModel;
    }): Promise<"Unavailable" | "Success" | "CannotObtainLock" | "InvalidUser" | "Failed" | "UndefinedError">;
    ping(): Promise<string>;
}
export declare class PaymentRequestRepositoryClass extends RepositoryBase {
    list(): Promise<IPaymentRequest[]>;
    details(payload: {
        id: string;
    }): Promise<IPaymentRequest>;
}
export declare class TaskRepositoryClass extends RepositoryBase {
    tasks(payload: {
        taskName?: string;
        minDate?: string;
        maxDate?: string;
    }): Promise<ITaskModel[]>;
    count(payload: {
        taskName?: string;
        minDate?: string;
        maxDate?: string;
    }): Promise<ITaskCountModel[]>;
}
export declare class TestRepositoryClass extends RepositoryBase {
    ping(): Promise<string>;
    authorized(): Promise<IAppUser>;
    error(): Promise<void>;
    signin(payload: {
        request?: ISignInRequestModel;
    }): Promise<ISignInResponseModel>;
}
export declare class UserRepositoryClass extends RepositoryBase {
    users(): Promise<IUserListItem>;
}
export declare class VacationRepositoryClass extends RepositoryBase {
    vacation(payload: {
        taskName?: string;
        minDate?: string;
        maxDate?: string;
    }): Promise<IVacation[]>;
    list(payload: {
        taskName?: string;
        minDate?: string;
        maxDate?: string;
    }): Promise<IVacation[]>;
    count(payload: {
        taskName?: string;
        minDate?: string;
        maxDate?: string;
    }): Promise<ITaskCountModel>;
    details(payload: {
        id: string;
    }): Promise<IVacation>;
    outcomes(payload: {
        id: string;
    }): Promise<ITaskOutcome[]>;
    approvers(payload: {
        id: string;
    }): Promise<ITaskParticipant[]>;
    delegate(payload: {
        id: string;
        request?: IDelegateTaskModel;
    }): Promise<"Unavailable" | "Success" | "CannotObtainLock" | "InvalidUser" | "Failed" | "UndefinedError">;
    processing(payload: {
        id: string;
        request?: IProcessingTaskModel;
    }): Promise<"Unavailable" | "Success" | "CannotObtainLock" | "InvalidUser" | "Failed" | "UndefinedError">;
    ping(): Promise<string>;
}
