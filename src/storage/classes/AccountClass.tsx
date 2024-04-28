import { AccountIcons } from "../../utils/LogosAndIcons";
import { AccountType } from "../AccountTypeEnum";
import { Subscription } from "./SubscriptionClass";
import { Transaction } from "./TransactionClass";

export class Account {
    private _transactionHistory: Array<Transaction> = new Array<Transaction>();
    private _icon: JSX.Element = AccountIcons.Account(20, "#FFF");
    private _attachedSubscriptions: Array<Subscription> = Array<Subscription>();

    /**
     * Creates a new Account instance.
     * @param private _name The name of the account.
     * @param readonly bankId The bank reference id (First 4 digits).
     * @param readonly accountId The id of the account.
     * @param private _balance The balance on the account.
     * @param transactionHistory Optional array of transactions for intializing the transaction history of the account.
     * @param attachedSubscriptions Optional array of subscriptions attached to the account.
     */
    constructor(
        private _name: string, 
        readonly accountType: AccountType,
        readonly bankId: number, 
        readonly accountId: number, 
        private _balance: number, 
        icon?: JSX.Element,
        transactionHistory?: Array<Transaction>,
        attachedSubscriptions?: Array<Subscription>,
    ) {
        if (icon) {
            this._icon = icon;
        }  
        if (transactionHistory) {
            this._transactionHistory = transactionHistory;
        }
        if (attachedSubscriptions) {
            this._attachedSubscriptions = attachedSubscriptions;
        }
    }



    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get icon(): JSX.Element {
        return this._icon;
    }

    set icon(icon: JSX.Element) {
        this._icon = icon;
    }

    get fullId(): string {
        return `${this.bankId} ${this.accountId}`;
    }

    get balance(): number {
        return this._balance;
    }

    /**
     * Deposits money into the balance of the account.
     * @param amount The amount to deposit.
     */
    deposit(amount: number) {
        this._balance += amount;
    }

    /**
     * Withdraws money from the balance of the account.
     * @param amount The amount to withdraw.
     */
    withdraw(amount: number) {
        let tempBalance = this._balance - amount;

        if (this.accountType === AccountType.DEBIT && tempBalance < 0)
            return console.warn(`Couldn't withdraw ${amount} from account ${this.fullId}. \nBalance would've been ${tempBalance}.`);
        this._balance -= amount;
    }

    get transactionHistory(): Array<Transaction> {
        return this._transactionHistory;
    }

    /**
     * Adds a new transaction to the transaction history of the account.
     * @param transaction The transaction to be added.
     */
    addTransaction(transaction: Transaction) {
        this._transactionHistory.push(transaction);
    }

    /**
     * Removes a specified transaction from the transaction history of the account.
     * @param transaction The transaction to be removed.
     */
    removeTransaction(transaction: Transaction) {
        let indexOfTransaction = this._transactionHistory.findIndex((element) => element === transaction);
        if (indexOfTransaction)
            this._transactionHistory.splice(indexOfTransaction);
    }

    get latestTransaction(): Transaction {
        return this._transactionHistory[this._transactionHistory.length - 1];
    }


    get attachedSubscriptions(): Array<Subscription> {
        return this._attachedSubscriptions;
    }

    /**
     * Attaches a subscription to the account
     * @param subscription The subsription to attach to the account.
     */
    attachSubscription(subscription: Subscription) {
        this._attachedSubscriptions.push(subscription);
    }

    /**
     * Detaches a subscription from the account
     * @param subscription The subsription to detach to the account.
     */
    detachSubscription(subscriptionIndex: number): void
    detachSubscription(subscription: Subscription | number): void {
        let index: number = -1;

        if (typeof subscription === "number") {
            index = subscription;
        } else if (typeof subscription === typeof Subscription) {
            if (!this._attachedSubscriptions.includes(subscription)) {
                return console.log(`Couldn't find subscription ${subscription.getName()} in attached subscriptions for account ${this._name}`)
            }
            index = this._attachedSubscriptions.indexOf(subscription);
        }

        this._attachedSubscriptions.splice(index, 1);
    }

    
}