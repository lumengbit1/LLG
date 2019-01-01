import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

// import { withI18n, reactI18nextModule } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    interpolation: {
      // React already does escaping
      escapeValue: false
    },
    react: {
      wait: true
    },
    lng: "en",
    fallbackLng: "en",
    // debug: true,
    // Using simple hardcoded resources for simple example
    resources: {
      en: {
        translation: {
          welcome: { label: "Welcome" },
          player: { label: "PLAYER" },
          banker: { label: "BANKER" },
          tie: { label: "TIE" },
          playerpair: { label: "PLAYER PAIR" },
          bankerpair: { label: "BANKER PAIR" },
          P: { label: "P" },
          B: { label: "B" },
          T: { label: "T" },
          confirm: { label: "CONFIRM" },
          undo: { label: "CANCEL" },
          sending: { label: "SENDING" },
          score: { label: "SCORE" },
          getscatter: { label: "Get Scatter" },
          placeyourbets: { label: "PLACE YOUR BETS" },
          balance: { label: "Balance" },
          timer: { label: "Timer" },
          nomorebets: { label: "NO MORE BETS" },
          drawingcards: { label: "Drawing Cards" },
          limit: { label: "LIMIT" },
          total: { label: "TOTAL" },
          mainbet: { label: "Main Bet" },
          sidebet: { label: "Side Bet" },
          min: { label: "Min" },
          max: { label: "Max" },
          signin: { label: "Please Sign In" },
          referral: { label: "Referral Link" },
          logout: { label: "Logout" },
          nextdividend: { label: "Next Dividend" },
          claim: { label: "Claim" },
          claiming: { label: "Claiming" },
          claimed: { label: "Claimed" },
          unstake: { label: "Unstake" },
          unstaking: { label: "Unstaking" },
          stakeable: { label: "Stakeable" },
          staked: { label: "Staked" },
          stake: { label: "Stake" },
          totalstakedllg: { label: "Total Staked LLG" },
          mydividend: { label: "My Dividend" },
          projecteddailydividend: { label: "Estimated Daily Dividend" },
          claimabledividend: { label: "Claimable Dividend" },
          claimdividend: { label: "Claim Dividends" },
          dividendpool: { label: "Dividend Pool" },
          totalcirculation: { label: "Total Circulation" },
          dividendweight: { label: "Dividend Weight" },
          dailyroi: { label: "Daily ROI Projection" },
          yearlyroi: { label: "Yearly ROI Projection" },
          roundtext: { label: "Next Round:" },
          leaderboard: {
            label: "Leaderboard",
            today: "Today",
            yesterday: "Yesterday",
            week: "This week"
          },
          leaderNo: { label: "No." },
          leaderAccount: { label: "Account" },
          leaderAmount: { label: "Amount" },
          lobby: { label: "LOBBY" },
          dividend: { label: "DIVIDEND" },
          leaders: { label: "LEADERS" },
          help: { label: "HELP" },
          activity: {
            row1: "Lelego上线新的周排行，从今天起实行周排行及日排行奖励制度。",
            row2: `
            具体规则如下：<br />
            1.分红时间更改到每日北京时间晚上8点，日排行榜周期为前日晚8点到次日晚8点，周排行榜按照自然周计算，截止为周日晚8点<br />
            2.日排行奖励为每日分红奖励的50%，前三有奖励，按照60%/30%/10%进行分配.每日分红奖励为当日资金池盈利的10%.<br />
            3.周排行奖励为当周累计分红奖励总额的25%，前五有奖励，按照40%/25%/15%/12%/8%进行分配<br />
            4.采用的是线性分红，当资金池亏空，预留池会按照比例进行补充<br />
            5.lelego将会在矿池释放触及21%时候，线性增加挖矿难度，从目前的输掉1eos返佣10LLG变更为8LLG<br />
            `,
            row3: `
            游戏链接：<a href="https://play.lelego.io">https://play.lelego.io</a> 官网链接：<a href="lelego.io">lelego.io</a>
            `
          }
        }
      },
      zh: {
        translation: {
          welcome: { label: "歡迎" },
          player: { label: "閒" },
          banker: { label: "莊" },
          tie: { label: "合" },
          playerpair: { label: "閒對" },
          bankerpair: { label: "莊對" },
          P: { label: "閒" },
          B: { label: "莊" },
          T: { label: "合" },
          confirm: { label: "確定" },
          undo: { label: "取消" },
          sending: { label: "正在發送" },
          score: { label: "得分" },
          getscatter: { label: "下載 Scatter" },
          placeyourbets: { label: "請下注" },
          balance: { label: "余额" },
          timer: { label: "倒計時器" },
          nomorebets: { label: "投注已結束" },
          drawingcards: { label: "正在發牌" },
          limit: { label: "限額" },
          total: { label: "總數" },
          mainbet: { label: "主注" },
          sidebet: { label: "邊注" },
          min: { label: "最少" },
          max: { label: "最多" },
          signin: { label: "請登入" },
          referral: { label: "邀請" },
          logout: { label: "登出" },
          nextdividend: { label: "距離下次分紅" },
          claim: { label: "領取" },
          claiming: { label: "正在領取" },
          claimed: { label: "已領取了" },
          unstake: { label: "贖回" },
          unstaking: { label: "贖回中" },
          stakeable: { label: "可抵押" },
          staked: { label: "已抵押" },
          stake: { label: "抵押" },
          totalstakedllg: { label: "總抵押的LLG" },
          mydividend: { label: "我的分紅" },
          projecteddailydividend: { label: "當日預估分紅" },
          claimabledividend: { label: "可領取的分紅" },
          claimdividend: { label: "領取分紅" },
          dividendpool: { label: "分紅池" },
          totalcirculation: { label: "總流通" },
          dividendweight: { label: "分紅權重" },
          dailyroi: { label: "預計日化收益" },
          yearlyroi: { label: "預計年化收益" },
          roundtext: { label: "下一局:" },
          leaderboard: {
            label: "下注排行榜",
            today: "本日下注排行",
            yesterday: "昨日下注排行",
            week: "本周下注排行"
          },
          leaderNo: { label: "排名" },
          leaderAccount: { label: "用户名" },
          leaderAmount: { label: "下注量" },
          lobby: { label: "游戏大厅" },
          dividend: { label: "每日分红" },
          leaders: { label: "下注排行" },
          help: { label: "帮助" },
          activity: {
            row1: "Lelego上线新的周排行，从今天起实行周排行及日排行奖励制度。",
            row2: `
            具体规则如下：<br />
            1.分红时间更改到每日北京时间晚上8点，日排行榜周期为前日晚8点到次日晚8点，周排行榜按照自然周计算，截止为周日晚8点<br />
            2.日排行奖励为每日分红奖励的50%，前三有奖励，按照60%/30%/10%进行分配.每日分红奖励为当日资金池盈利的10%.<br />
            3.周排行奖励为当周累计分红奖励总额的25%，前五有奖励，按照40%/25%/15%/12%/8%进行分配<br />
            4.采用的是线性分红，当资金池亏空，预留池会按照比例进行补充<br />
            5.lelego将会在矿池释放触及21%时候，线性增加挖矿难度，从目前的输掉1eos返佣10LLG变更为8LLG<br />
            `,
            row3: `
            游戏链接：<a href="https://play.lelego.io">https://play.lelego.io</a> 官网链接：<a href="lelego.io">lelego.io</a>
            `
          }
        }
      }
    }
  });

export default i18n;
