<template>
    <v-chart class="overflow-hidden" :option="option" theme="dark" autoresize />
</template>

<script setup lang="ts">
    import { use } from 'echarts/core'
    import VChart from 'vue-echarts'
    import { SVGRenderer } from 'echarts/renderers'
    import { BarChart } from 'echarts/charts'
    import { TooltipComponent, GridComponent } from 'echarts/components'
    import { computed, ref } from 'vue'

    import { useProposalStore } from '@/stores/proposal'
    import { storeToRefs } from 'pinia'

    const store = useProposalStore()
    const { proposals } = storeToRefs(store)
    const { fetchProposals } = store

    fetchProposals()

    use([
        SVGRenderer,
        GridComponent,
        BarChart,
        TooltipComponent
    ])

    const xAxisLabels = computed(() => proposals.value.map(proposal => proposal.number))
    const seriesData = computed(() => proposals.value.map(proposal => proposal.reward / 1000000000 / 1000000000))

    const option = ref({
        xAxis: [
            {
                type: 'category',
                data: xAxisLabels
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                data: seriesData,
                type: 'bar'
            }
        ],
        tooltip: {
            show: true,
            trigger: 'item'
        }
    })
</script>
