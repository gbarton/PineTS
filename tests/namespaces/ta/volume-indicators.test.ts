import { describe, expect, it } from 'vitest';
import { arrayPrecision, getKlines, runNSFunctionWithArgs } from '../../utils';

import { Context, PineTS, Provider } from 'index';

describe('Technical Analysis - Volume Indicators', () => {
    it('OBV - On-Balance Volume', async () => {
        const pineTS = new PineTS(Provider.Mock, 'BTCUSDC', 'W', null, new Date('2018-12-10').getTime(), new Date('2020-01-27').getTime());

        const sourceCode = (context) => {
            const { close, volume } = context.data;
            const { ta, plotchar } = context.pine;

            const obv = ta.obv;
            plotchar(obv, 'obv');

            return { obv };
        };

        const { result, plots } = await pineTS.run(sourceCode);

        let obv_plotdata = plots['obv']?.data;
        const startDate = new Date('2019-05-20').getTime();
        const endDate = new Date('2019-09-16').getTime();

        let plotdata_str = '';
        for (let i = 0; i < obv_plotdata.length; i++) {
            const time = obv_plotdata[i].time;
            if (time < startDate || time > endDate) {
                continue;
            }

            const str_time = new Date(time).toISOString().slice(0, -1) + '-00:00';
            const obv = obv_plotdata[i].value;
            plotdata_str += `[${str_time}]: ${obv}\n`;
        }

        const expected_plot = `[2019-05-20T00:00:00.000-00:00]: 89446.284892
[2019-05-27T00:00:00.000-00:00]: 104957.474839
[2019-06-03T00:00:00.000-00:00]: 90871.2614
[2019-06-10T00:00:00.000-00:00]: 104957.190506
[2019-06-17T00:00:00.000-00:00]: 121253.136353
[2019-06-24T00:00:00.000-00:00]: 92141.776478
[2019-07-01T00:00:00.000-00:00]: 112223.38526
[2019-07-08T00:00:00.000-00:00]: 91276.4229
[2019-07-15T00:00:00.000-00:00]: 113561.791623
[2019-07-22T00:00:00.000-00:00]: 102675.475375
[2019-07-29T00:00:00.000-00:00]: 115455.858888
[2019-08-05T00:00:00.000-00:00]: 135776.055283
[2019-08-12T00:00:00.000-00:00]: 117985.645096
[2019-08-19T00:00:00.000-00:00]: 102110.835788
[2019-08-26T00:00:00.000-00:00]: 89352.975732
[2019-09-02T00:00:00.000-00:00]: 103126.658087
[2019-09-09T00:00:00.000-00:00]: 92166.302632
[2019-09-16T00:00:00.000-00:00]: 80304.054136`;

        console.log('expected_plot', expected_plot);
        console.log('plotdata_str', plotdata_str);
        expect(plotdata_str.trim()).toEqual(expected_plot.trim());
    });
});
