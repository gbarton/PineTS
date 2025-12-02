import { describe, expect, it } from 'vitest';
import { arrayPrecision, getKlines, runNSFunctionWithArgs } from '../../utils';

import { Context, PineTS, Provider } from 'index';

describe('Technical Analysis - Volume Indicators', () => {
    it('CUM - Cumulative Sum', async () => {
        const pineTS = new PineTS(Provider.Mock, 'BTCUSDC', 'W', null, new Date('2018-12-10').getTime(), new Date('2020-01-27').getTime());

        const sourceCode = (context) => {
            const { close, volume } = context.data;
            const { ta, plotchar } = context.pine;

            const cum = ta.cum(close);
            plotchar(cum, 'cum');

            return { cum };
        };

        const { result, plots } = await pineTS.run(sourceCode);

        let cum_plotdata = plots['cum']?.data;
        const startDate = new Date('2018-12-10').getTime();
        const endDate = new Date('2019-02-16').getTime();

        let plotdata_str = '';
        for (let i = 0; i < cum_plotdata.length; i++) {
            const time = cum_plotdata[i].time;
            if (time < startDate || time > endDate) {
                continue;
            }

            const str_time = new Date(time).toISOString().slice(0, -1) + '-00:00';
            const cum = cum_plotdata[i].value;
            plotdata_str += `[${str_time}]: ${cum}\n`;
        }

        const expected_plot = `[2018-12-10T00:00:00.000-00:00]: 3199.27
[2018-12-17T00:00:00.000-00:00]: 7152.76
[2018-12-24T00:00:00.000-00:00]: 10974.42
[2018-12-31T00:00:00.000-00:00]: 15013.55
[2019-01-07T00:00:00.000-00:00]: 18522.76
[2019-01-14T00:00:00.000-00:00]: 22058.55
[2019-01-21T00:00:00.000-00:00]: 25589.91
[2019-01-28T00:00:00.000-00:00]: 29003.37
[2019-02-04T00:00:00.000-00:00]: 32654.94
[2019-02-11T00:00:00.000-00:00]: 36283.48`;

        console.log('expected_plot', expected_plot);
        console.log('plotdata_str', plotdata_str);
        expect(plotdata_str.trim()).toEqual(expected_plot.trim());
    });
});
