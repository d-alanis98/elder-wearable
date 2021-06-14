

export interface HeartRateResult {
    heartRate: number;
    saturation: number;
}

export const emptyResult: HeartRateResult = {
    heartRate: -1,
    saturation: -1,
};