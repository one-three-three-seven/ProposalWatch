export interface Block {
    number: number;
    reward: number;
}

export function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export async function getHeadBlockNumber(): Promise<number> {
    const response = await (await fetch('https://beaconcha.in/api/v1/slot/head')).json();
    return response.data.exec_block_number
}
