import { Segment } from "./Segment";

export default interface Ticket {
    id: string;
    price: number;
    companyId: string;
    segments: Array<Segment>;
}