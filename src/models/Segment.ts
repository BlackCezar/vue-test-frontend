// список перелётов
export interface Segment {
    id: string;
    origin: CityCodes;
    destination: CityCodes;
    dateStart: string;
    dateEnd: string;
    stops: CityCodes[];
    duration: number;
}

type CityCodes = 'MOW' | 'HKT' | 'HKG' | 'JNB' | 'PTB' | 'ARH' | 'TRN' | 'KRS' | 'SRT' | 'LOS' | 'EKV' | 'EKT';
