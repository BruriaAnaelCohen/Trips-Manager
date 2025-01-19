export class Trip {
  constructor(
    public TripCode?: number,
    public TripDestination: string = '',
    public TypeCode: number = 1,
    public TripDate: Date = new Date(),
    public TripDurationHours: number = 0,
    public AvailablePlaces: number = 0,
    public Price?: number,
    public Img: string = '',
    public NeedParamedicDTO: boolean = true,
    public TypeNameDTO: string = ''
  ) {}
}
