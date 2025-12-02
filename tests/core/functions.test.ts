import { describe, expect, it } from 'vitest';

import { PineTS, Provider } from 'index';

describe('Functions', () => {
    it('MFI using pine function', async () => {
        const pineTS = new PineTS(Provider.Mock, 'BTCUSDC', 'W', null, new Date('2018-12-10').getTime(), new Date('2020-01-27').getTime());

        const sourceCode = (context) => {
            const { close, high, low, volume } = context.data;
            const { ta, plotchar, math } = context.pine;

            function pine_mfi(src, length) {
                const upper = math.sum(volume * (ta.change(src, 1) <= 0.0 ? 0.0 : src), length);
                const lower = math.sum(volume * (ta.change(src, 1) >= 0.0 ? 0.0 : src), length);
                const mfi = 100.0 - 100.0 / (1.0 + upper / lower);
                return mfi;
            }

            const res = pine_mfi(close, 28);
            plotchar(res, '_plot');

            return { res };
        };

        const { result, plots } = await pineTS.run(sourceCode);

        let _plotdata = plots['_plot']?.data;
        const startDate = new Date('2019-05-20').getTime();
        const endDate = new Date('2019-09-16').getTime();

        let plotdata_str = '';
        for (let i = 0; i < _plotdata.length; i++) {
            const time = _plotdata[i].time;
            if (time < startDate || time > endDate) {
                continue;
            }

            const str_time = new Date(time).toISOString().slice(0, -1) + '-00:00';
            const res = _plotdata[i].value;
            plotdata_str += `[${str_time}]: ${res}\n`;
        }

        const expected_plot = `[2019-05-20T00:00:00.000-00:00]: NaN
[2019-05-27T00:00:00.000-00:00]: NaN
[2019-06-03T00:00:00.000-00:00]: NaN
[2019-06-10T00:00:00.000-00:00]: NaN
[2019-06-17T00:00:00.000-00:00]: 78.6068702018
[2019-06-24T00:00:00.000-00:00]: 66.0634134155
[2019-07-01T00:00:00.000-00:00]: 69.0580680323
[2019-07-08T00:00:00.000-00:00]: 63.5411497242
[2019-07-15T00:00:00.000-00:00]: 66.5693463113
[2019-07-22T00:00:00.000-00:00]: 65.0696876138
[2019-07-29T00:00:00.000-00:00]: 66.429194205
[2019-08-05T00:00:00.000-00:00]: 69.7161316028
[2019-08-12T00:00:00.000-00:00]: 66.1599680125
[2019-08-19T00:00:00.000-00:00]: 62.6583568225
[2019-08-26T00:00:00.000-00:00]: 60.6195705525
[2019-09-02T00:00:00.000-00:00]: 61.9923889059
[2019-09-09T00:00:00.000-00:00]: 59.7938250296
[2019-09-16T00:00:00.000-00:00]: 57.5958647918`;

        console.log('expected_plot', expected_plot);
        console.log('plotdata_str', plotdata_str);
        expect(plotdata_str.trim()).toEqual(expected_plot.trim());
    });

    it('CMO Function', async () => {
        const pineTS = new PineTS(Provider.Mock, 'BTCUSDC', 'W', null, new Date('2018-12-10').getTime(), new Date('2020-01-27').getTime());

        const sourceCode = (context) => {
            const { close, high, low, volume } = context.data;
            const { ta, plotchar, math } = context.pine;

            function f_cmo(src, length) {
                const mom = ta.change(src);
                const sm1 = math.sum(mom >= 0 ? mom : 0.0, length);
                const sm2 = math.sum(mom >= 0 ? 0.0 : -mom, length);
                return (100 * (sm1 - sm2)) / (sm1 + sm2);
            }
            const res = f_cmo(close, 2);
            plotchar(res, '_plot');

            return { res };
        };

        const { result, plots } = await pineTS.run(sourceCode);

        let _plotdata = plots['_plot']?.data;
        const startDate = new Date('2018-12-10').getTime();
        const endDate = new Date('2019-02-16').getTime();

        let plotdata_str = '';
        for (let i = 0; i < _plotdata.length; i++) {
            const time = _plotdata[i].time;
            if (time < startDate || time > endDate) {
                continue;
            }

            const str_time = new Date(time).toISOString().slice(0, -1) + '-00:00';
            const res = _plotdata[i].value;
            plotdata_str += `[${str_time}]: ${res}\n`;
        }

        const expected_plot = `[2018-12-10T00:00:00.000-00:00]: NaN
[2018-12-17T00:00:00.000-00:00]: NaN
[2018-12-24T00:00:00.000-00:00]: 70.2432142656
[2018-12-31T00:00:00.000-00:00]: 24.5176066419
[2019-01-07T00:00:00.000-00:00]: -41.8054830811
[2019-01-14T00:00:00.000-00:00]: -90.4474393531
[2019-01-21T00:00:00.000-00:00]: 71.4285714286
[2019-01-28T00:00:00.000-00:00]: -100
[2019-02-04T00:00:00.000-00:00]: 33.7659054521
[2019-02-11T00:00:00.000-00:00]: 82.3619514437`;

        console.log('expected_plot', expected_plot);
        console.log('plotdata_str', plotdata_str);
        expect(plotdata_str.trim()).toEqual(expected_plot.trim());
    });

    it('COG Function', async () => {
        const pineTS = new PineTS(Provider.Mock, 'BTCUSDC', 'W', null, new Date('2018-12-10').getTime(), new Date('2020-01-27').getTime());

        const sourceCode = (context) => {
            const { close, high, low, volume } = context.data;
            const { ta, plotchar, math } = context.pine;

            function pine_cog(source, length) {
                const sum = math.sum(source, length);
                let num = 0.0;
                for (let i = 0; i <= length - 1; i++) {
                    const price = source[i];
                    num = num + price * (i + 1);
                }
                return -num / sum;
            }
            const res = pine_cog(close, 2);
            plotchar(res, '_plot');

            return { res };
        };

        const { result, plots } = await pineTS.run(sourceCode);

        let _plotdata = plots['_plot']?.data;
        const startDate = new Date('2018-12-10').getTime();
        const endDate = new Date('2019-02-16').getTime();

        let plotdata_str = '';
        for (let i = 0; i < _plotdata.length; i++) {
            const time = _plotdata[i].time;
            if (time < startDate || time > endDate) {
                continue;
            }

            const str_time = new Date(time).toISOString().slice(0, -1) + '-00:00';
            const res = _plotdata[i].value;
            plotdata_str += `[${str_time}]: ${res}\n`;
        }

        const expected_plot = `[2018-12-10T00:00:00.000-00:00]: NaN
[2018-12-17T00:00:00.000-00:00]: -1.4472776942
[2018-12-24T00:00:00.000-00:00]: -1.5084776499
[2018-12-31T00:00:00.000-00:00]: -1.4861674208
[2019-01-07T00:00:00.000-00:00]: -1.5351017575
[2019-01-14T00:00:00.000-00:00]: -1.4981135557
[2019-01-21T00:00:00.000-00:00]: -1.500313422
[2019-01-28T00:00:00.000-00:00]: -1.508488341
[2019-02-04T00:00:00.000-00:00]: -1.4831486915
[2019-02-11T00:00:00.000-00:00]: -1.5015817069`;

        console.log('expected_plot', expected_plot);
        console.log('plotdata_str', plotdata_str);
        expect(plotdata_str.trim()).toEqual(expected_plot.trim());
    });
});
