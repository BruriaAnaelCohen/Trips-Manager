export class User {
  constructor(
    public FName: string = '',
    public LName: string = '',
    public Phone: string = '',
    public Email: string = '',
    public LoginPassword: string = '',
    public FirstAidCertificate: boolean = false,
    public UserCode?: number
  ) {}
}
