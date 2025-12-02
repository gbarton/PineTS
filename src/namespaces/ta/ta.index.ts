// SPDX-License-Identifier: AGPL-3.0-only
// This file is auto-generated. Do not edit manually.
// Run: npm run generate:ta-index



import { alma } from './methods/alma';
import { atr } from './methods/atr';
import { bb } from './methods/bb';
import { cci } from './methods/cci';
import { change } from './methods/change';
import { crossover } from './methods/crossover';
import { crossunder } from './methods/crossunder';
import { cum } from './methods/cum';
import { dev } from './methods/dev';
import { ema } from './methods/ema';
import { highest } from './methods/highest';
import { hma } from './methods/hma';
import { linreg } from './methods/linreg';
import { lowest } from './methods/lowest';
import { macd } from './methods/macd';
import { median } from './methods/median';
import { mfi } from './methods/mfi';
import { mom } from './methods/mom';
import { obv } from './methods/obv';
import { param } from './methods/param';
import { pivothigh } from './methods/pivothigh';
import { pivotlow } from './methods/pivotlow';
import { rma } from './methods/rma';
import { roc } from './methods/roc';
import { rsi } from './methods/rsi';
import { sma } from './methods/sma';
import { stdev } from './methods/stdev';
import { stoch } from './methods/stoch';
import { supertrend } from './methods/supertrend';
import { swma } from './methods/swma';
import { tr } from './methods/tr';
import { variance } from './methods/variance';
import { vwap } from './methods/vwap';
import { vwma } from './methods/vwma';
import { wma } from './methods/wma';

const getters = {

};

const methods = {
  alma,
  atr,
  bb,
  cci,
  change,
  crossover,
  crossunder,
  cum,
  dev,
  ema,
  highest,
  hma,
  linreg,
  lowest,
  macd,
  median,
  mfi,
  mom,
  obv,
  param,
  pivothigh,
  pivotlow,
  rma,
  roc,
  rsi,
  sma,
  stdev,
  stoch,
  supertrend,
  swma,
  tr,
  variance,
  vwap,
  vwma,
  wma
};

export class TechnicalAnalysis {


  alma: ReturnType<typeof methods.alma>;
  atr: ReturnType<typeof methods.atr>;
  bb: ReturnType<typeof methods.bb>;
  cci: ReturnType<typeof methods.cci>;
  change: ReturnType<typeof methods.change>;
  crossover: ReturnType<typeof methods.crossover>;
  crossunder: ReturnType<typeof methods.crossunder>;
  cum: ReturnType<typeof methods.cum>;
  dev: ReturnType<typeof methods.dev>;
  ema: ReturnType<typeof methods.ema>;
  highest: ReturnType<typeof methods.highest>;
  hma: ReturnType<typeof methods.hma>;
  linreg: ReturnType<typeof methods.linreg>;
  lowest: ReturnType<typeof methods.lowest>;
  macd: ReturnType<typeof methods.macd>;
  median: ReturnType<typeof methods.median>;
  mfi: ReturnType<typeof methods.mfi>;
  mom: ReturnType<typeof methods.mom>;
  obv: ReturnType<typeof methods.obv>;
  param: ReturnType<typeof methods.param>;
  pivothigh: ReturnType<typeof methods.pivothigh>;
  pivotlow: ReturnType<typeof methods.pivotlow>;
  rma: ReturnType<typeof methods.rma>;
  roc: ReturnType<typeof methods.roc>;
  rsi: ReturnType<typeof methods.rsi>;
  sma: ReturnType<typeof methods.sma>;
  stdev: ReturnType<typeof methods.stdev>;
  stoch: ReturnType<typeof methods.stoch>;
  supertrend: ReturnType<typeof methods.supertrend>;
  swma: ReturnType<typeof methods.swma>;
  tr: ReturnType<typeof methods.tr>;
  variance: ReturnType<typeof methods.variance>;
  vwap: ReturnType<typeof methods.vwap>;
  vwma: ReturnType<typeof methods.vwma>;
  wma: ReturnType<typeof methods.wma>;

  constructor(private context: any) {
    // Install getters
    Object.entries(getters).forEach(([name, factory]) => {
      Object.defineProperty(this, name, {
        get: factory(context),
        enumerable: true
      });
    });
    
    // Install methods
    Object.entries(methods).forEach(([name, factory]) => {
      this[name] = factory(context);
    });
  }
}

export default TechnicalAnalysis;
