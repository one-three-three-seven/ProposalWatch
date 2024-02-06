import { sleep, type Block, getHeadBlockNumber } from '@/lib'
import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useProposalStore = defineStore('proposal', () => {
    const proposals: Ref<Block[]> = ref([])

    async function fetchProposals() {
        while (true) {
            const numbers: number[] = [];
            const headBlockNumber: number = await getHeadBlockNumber()

            for (let i = headBlockNumber; i > headBlockNumber - 100; i--) {
                numbers.push(i);
            }

            const response = await (await fetch(`https://beaconcha.in/api/v1/execution/block/${numbers.join(',')}`)).json();

            const list: Block[] = []
            response.data.forEach((block: any) => {
                list.push({ number: block.blockNumber, reward: block.producerReward })
            })

            list.sort((a, b) => a.number - b.number)
            proposals.value = list
            await sleep(15000)
        }
    }

    return { proposals, fetchProposals }
})
