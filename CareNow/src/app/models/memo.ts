export class Memo {
    public memoId: String;
    public recepientType: String;
    public senderType: String;
    public content: String;
    public senderId: String;
    public recepientId: String;
    public memoDate: string;

    constructor(RecepientType: String, SenderType: String, 
        Content: String, SenderId: String, RecepientId: String, MemoDate:string) {
        this.recepientType = RecepientType;
        this.senderType = SenderType;
        this.content = Content;
        this.senderId = SenderId;
        this.recepientId = RecepientId;
        this.memoDate = MemoDate;

    }

}