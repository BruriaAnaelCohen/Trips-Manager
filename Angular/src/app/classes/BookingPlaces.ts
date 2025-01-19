export class BookingPlaces {
  constructor(
    public UserCode?: number,
    public BookingDate: Date = new Date(),
    public TripCode?: number,
    public NumberOfPlaces: number = 1,
    public UserFullNameDTO?: string,
    public DestinationDTO?: string,
    public BookingCode?: number
  ) {}
}
