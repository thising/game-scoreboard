/**
 * Poker Quotes Module - 扑克语录模块
 * 随机展示扑克名言，提供中英文对照
 */

// 扑克语录数据 - 100条精选语录
const POKER_QUOTES = [
    {
        "id": 1,
        "chinese": "重要的不是你赢了还是输了，而是你能讲多少个 bad beat 的故事。",
        "english": "It's not whether you won or lost, but how many bad beat stories you were able to tell.",
        "author": "Grantland Rice"
    },
    {
        "id": 2,
        "chinese": "扑克有运动的感觉，但你不用做俯卧撑。",
        "english": "Poker has the feeling of a sport, but you don't have to do push-ups.",
        "author": "Penn Jillette"
    },
    {
        "id": 3,
        "chinese": "他们说扑克是技巧游戏，但有时你必须赌博并祈祷。",
        "english": "They say poker is a skill game, but sometimes you've just got to gamble and pray.",
        "author": "Tom Dwan"
    },
    {
        "id": 4,
        "chinese": "扑克的目标是让菲尔·艾维尽可能长时间拿不到你的钱。",
        "english": "The object of poker is to keep your money away from Phil Ivey for as long as possible.",
        "author": "Gus Hansen"
    },
    {
        "id": 5,
        "chinese": "奥马哈是一个虐待狂发明的游戏，由受虐狂来玩。",
        "english": "Omaha is a game that was invented by a sadist and is played by masochists.",
        "author": "Shane Smith"
    },
    {
        "id": 6,
        "chinese": "昨晚我熬夜用塔罗牌玩扑克。我拿到了满堂红，四个人死了。",
        "english": "Last night I stayed up late playing poker with Tarot cards. I got a full house and four people died.",
        "author": "Steven Wright"
    },
    {
        "id": 7,
        "chinese": "如果真有像菲尔认为自己那么厉害的玩家，我们一手牌都赢不了。",
        "english": "If there ever was a player who was as good as Phil thinks he is, we'd never win a single hand.",
        "author": "Doyle Brunson"
    },
    {
        "id": 8,
        "chinese": "我打扑克供三个孩子读完大学。不幸的是，他们不是我的孩子。",
        "english": "I put three kids through college playing poker. Unfortunately, they weren't my kids.",
        "author": "Max Shapiro"
    },
    {
        "id": 9,
        "chinese": "每手牌都打，你不可能全部错过。",
        "english": "Just play every hand, you can't miss them all.",
        "author": "Sammy Farha"
    },
    {
        "id": 10,
        "chinese": "扑克很像性。每个人都认为自己是最好的，但大多数人根本不知道自己在做什么。",
        "english": "Poker is a lot like sex. Everyone thinks they are the best, but most don't have a clue what they are doing.",
        "author": "Dutch Boyd"
    },
    {
        "id": 11,
        "chinese": "一个人应该每天赌博，因为想想看，如果你走运却不知道，那该有多糟糕。",
        "english": "A person should gamble every day, because think of how bad it would be to be walking around lucky and not know it.",
        "author": "Robert Turner"
    },
    {
        "id": 12,
        "chinese": "被认为是某件每天都让我困惑的事情的专家，感觉很奇怪。",
        "english": "It's weird being considered an expert at something that confuses me every single day.",
        "author": "Erik Seidel"
    },
    {
        "id": 13,
        "chinese": "亲爱的，他们忘了一件事——我能躲子弹，宝贝！",
        "english": "Honey, they forgot one thing—I can dodge bullets, baby!",
        "author": "Phil Hellmuth"
    },
    {
        "id": 14,
        "chinese": "扑克是一个假装是运气游戏的技巧游戏。",
        "english": "Poker is a skill game pretending to be a chance game.",
        "author": "James Altucher"
    },
    {
        "id": 15,
        "chinese": "你通过弃牌来展示你的扑克伟大，而不是通过玩牌。",
        "english": "You will show your poker greatness by the hands you fold, not the hands you play.",
        "author": "Dan Reed"
    },
    {
        "id": 16,
        "chinese": "弃牌，然后继续弃牌。",
        "english": "Fold and live to fold again.",
        "author": "Stu Ungar"
    },
    {
        "id": 17,
        "chinese": "认真的扑克与赌博无关，就像攀岩与冒险无关一样。",
        "english": "Serious poker is no more about gambling than rock climbing is about taking risks.",
        "author": "Al Alvarez"
    },
    {
        "id": 18,
        "chinese": "从长远来看，扑克中没有运气，但短期比你想象的要长。",
        "english": "In the long run there's no luck in poker, but the short run is longer than most people know.",
        "author": "Rick Bennett"
    },
    {
        "id": 19,
        "chinese": "别说什么筹码和椅子了，给我一手牌，我就能站起来。",
        "english": "Forget about a chip and a chair; give me a hand and I'll stand.",
        "author": "Warren Karp"
    },
    {
        "id": 20,
        "chinese": "不要因为输了而生气，要因为没有赢而生气。",
        "english": "Don't get mad that you lost, get mad because you didn't win.",
        "author": "Michael Gersitz"
    },
    {
        "id": 21,
        "chinese": "扑克的强项是永远不要发脾气，无论是对你正在玩的人，还是对牌。扑克中没有同情。",
        "english": "The strong point in poker is never to lose your temper, either with those you are playing or, more particularly with the cards. There is no sympathy in poker.",
        "author": "William J. Florence"
    },
    {
        "id": 22,
        "chinese": "每个人都会偶尔走运，但没有人一直走运。",
        "english": "Everyone gets lucky once in a while, but no one is consistently lucky.",
        "author": "Doyle Brunson"
    },
    {
        "id": 23,
        "chinese": "扑克不仅仅是赔率、动作和计算的游戏。它是控制和利用情绪的游戏。",
        "english": "Poker is not simply a game of odds, moves and calculations. It is a game of controlled and exploited emotions.",
        "author": "Steven Lubet"
    },
    {
        "id": 24,
        "chinese": "你在扑克中赢得的大部分钱不是来自你出色的打法，而是来自对手的无能。",
        "english": "Most of the money you'll win at poker comes not from the brilliance of your own play, but from the ineptitude of your opponents.",
        "author": "Lou Krieger"
    },
    {
        "id": 25,
        "chinese": "有限注是科学，但无限注是艺术。有限注中，你是在瞄准目标。无限注中，你是在画一幅画。",
        "english": "Limit poker is a science, but no-limit is an art. In limit, you are shooting at a target. In no-limit, you are painting a picture.",
        "author": "Crandell Addington"
    },
    {
        "id": 26,
        "chinese": "扑克可能是心理战的一个分支，一种艺术形式，或者确实是一种生活方式，但它也只是一种游戏，金钱只是记分的一种方式。",
        "english": "Poker may be a branch of psychological warfare, an art form or indeed a way of life, but it is also merely a game in which money is simply the means of keeping score.",
        "author": "Anthony Holden"
    },
    {
        "id": 27,
        "chinese": "我相信扑克就像我相信美国梦一样。扑克对你有好处。它丰富灵魂，磨砺智慧。",
        "english": "I believe in poker the way I believe in the American Dream. Poker is good for you. It enriches the soul, sharpens the intellect.",
        "author": "Herbert O. Yardley"
    },
    {
        "id": 28,
        "chinese": "生活就像扑克游戏。你不能选择发给你的牌，但如何打这手牌完全取决于你。",
        "english": "Life is like a poker game. You don't get to choose the cards you are dealt, but it's entirely up to you how to play the hand.",
        "author": "Regina Brett"
    },
    {
        "id": 29,
        "chinese": "玩对手，不要玩你的牌。",
        "english": "Play the player, not your cards.",
        "author": "Amarillo Slim"
    },
    {
        "id": 30,
        "chinese": "无限注的关键是让一个人做出押上所有筹码的决定。",
        "english": "The key to No Limit poker is to put a man to a decision for all his chips.",
        "author": "Doyle Brunson"
    },
    {
        "id": 31,
        "chinese": "不要挑战强手，挑战弱手。这就是他们存在的原因。",
        "english": "Don't challenge strong players, challenge weak ones. That's what they're there for.",
        "author": "John Vorhaus"
    },
    {
        "id": 32,
        "chinese": "没有人总是赢家，任何说自己是赢家的人，要么是骗子，要么不玩扑克。",
        "english": "Nobody is always a winner, and anybody who says he is, is either a liar or doesn't play poker.",
        "author": "Amarillo Slim"
    },
    {
        "id": 33,
        "chinese": "我认为扑克有趣的一点是，一旦你的自我介入，你就完了。",
        "english": "I think one of the interesting things about poker is that once you let your ego in, you're done for.",
        "author": "Al Alvarez"
    },
    {
        "id": 34,
        "chinese": "在扑克中成功的两件事：第一，找到弃牌堆；第二，不要玩自己的钱。",
        "english": "The two things you need to be successful in poker are, first, find the muck, and second, don't play your own money.",
        "author": "David Devilfish Ulliott"
    },
    {
        "id": 35,
        "chinese": "当我经历 bad beat 时，我把它当作开销。如果你拥有一家企业，你必须支付账单，我把 bad beat 当作我的账单之一。",
        "english": "When I experience a bad beat, I think of it as an overhead. If you own a business, you have to pay your bills, and I consider a bad beat one of my bills.",
        "author": "Jennifer Harman"
    },
    {
        "id": 36,
        "chinese": "扑克的美丽之处在于每个人都认为自己会玩。",
        "english": "The beautiful thing about poker is that everybody thinks they can play.",
        "author": "Chris Moneymaker"
    },
    {
        "id": 37,
        "chinese": "读懂对手就像读一本书——除了这本书试图对你撒谎。",
        "english": "Reading your opponent is like reading a book – except the book is trying to lie to you.",
        "author": "Mike Caro"
    },
    {
        "id": 38,
        "chinese": "如果你是优秀玩家，人们会比你对他们更多地抽牌赢你，因为他们对阵你时总是拿着更差的牌。",
        "english": "If you are an excellent player, people are going to draw out on you a lot more than you're going to draw out on them, because they're simply going to have the worst hand against you a lot more.",
        "author": "Bobby Baldwin"
    },
    {
        "id": 39,
        "chinese": "如果你喜欢观察人，扑克很好。但如果你喜欢人，那么你可能不会那么喜欢人了。",
        "english": "Poker's good if you like watching people. Not if you like people because then you won't like people so much.",
        "author": "Jesse May"
    },
    {
        "id": 40,
        "chinese": "扑克是技巧和运气的结合。人们认为掌握技巧部分很难，但他们错了。扑克的诀窍是掌握运气。",
        "english": "Poker is a combination of luck and skill. People think mastering the skill part is hard, but they're wrong. The trick to poker is mastering the luck.",
        "author": "Jesse May"
    },
    {
        "id": 41,
        "chinese": "下注最多的人赢。牌只是用来打破平局的。",
        "english": "The one who bets the most wins. Cards just break ties.",
        "author": "Sammy Farha"
    },
    {
        "id": 42,
        "chinese": "扑克是百分之百的技巧和百分之五十的运气。",
        "english": "Poker is 100% skill and 50% luck.",
        "author": "Phil Hellmuth"
    },
    {
        "id": 43,
        "chinese": "在线扑克让你有机会以最少的努力实现扑克脸。",
        "english": "Online poker gives you the supreme opportunity to achieve a poker face with the minimum of effort.",
        "author": "Judi James"
    },
    {
        "id": 44,
        "chinese": "生活并不总是拿着好牌的问题，有时是打好一手烂牌的问题。",
        "english": "Life is not always a matter of holding good cards, but sometimes playing a poor hand well.",
        "author": "Jack London"
    },
    {
        "id": 45,
        "chinese": "历史上最常见的错误是低估你的对手；这在牌桌上经常发生。",
        "english": "The commonest mistake in history is underestimating your opponent; happens at the poker table all the time.",
        "author": "General David Shoup"
    },
    {
        "id": 46,
        "chinese": "相信每个人，但一定要切牌。",
        "english": "Trust everyone, but always cut the cards.",
        "author": "Benny Binion"
    },
    {
        "id": 47,
        "chinese": "我学到了两件事……虚张声势的艺术……和抽牌的运气。",
        "english": "I learned two things. The art of the bluff and the luck of the draw.",
        "author": "William Diehl"
    },
    {
        "id": 48,
        "chinese": "无论是谁创造了'人必须打发给他的那手牌'这句话，肯定是个糟糕的虚张声势者。",
        "english": "Whoever coined the phrase 'a man's got to play the hand that was dealt him' was most certainly one piss-poor bluffer.",
        "author": "Jeannette Walls"
    },
    {
        "id": 49,
        "chinese": "生活在过去是一张 Jethro Tull 专辑，不是明智的扑克策略。",
        "english": "Living in the past is a Jethro Tull album, not a smart poker strategy.",
        "author": "Richard Roeper"
    },
    {
        "id": 50,
        "chinese": "扑克比生活更重要。",
        "english": "There is more to poker than life.",
        "author": "Tom McEvoy"
    },
    {
        "id": 51,
        "chinese": "如果你愿意，可以依赖兔子的脚，但记住它对兔子没用。",
        "english": "Depend on the rabbit's foot if you will, but remember it didn't work for the rabbit.",
        "author": "R.E. Shay"
    },
    {
        "id": 52,
        "chinese": "发明扑克的人很聪明，但发明筹码的人是天才。",
        "english": "The guy who invented poker was bright, but the guy who invented the chip was a genius.",
        "author": "Julius Weintraub"
    },
    {
        "id": 53,
        "chinese": "我从玩扑克中学到，你永远不要数你的赢利，因为那是你开始输的时候。",
        "english": "I learned playing poker that you never count your winnings because that's when you start to lose.",
        "author": "Kenneth Langone"
    },
    {
        "id": 54,
        "chinese": "扑克游戏中真实的也是生活中真实的。大多数人都是傻瓜，却没有意识到。",
        "english": "What's true of the poker game is true of life. Most people are suckers and don't realize it.",
        "author": "Michael Faust"
    },
    {
        "id": 55,
        "chinese": "史密斯威森胜过四条A。",
        "english": "A Smith & Wesson beats four aces.",
        "author": "American proverb"
    },
    {
        "id": 56,
        "chinese": "人们会惊讶于我从玩扑克中学到了多少关于祈祷的知识。",
        "english": "People would be surprised to know how much I learned about prayer from playing poker.",
        "author": "Mary Austin"
    },
    {
        "id": 57,
        "chinese": "希望不是一种策略。",
        "english": "Hope is not a strategy.",
        "author": "Rick Page"
    },
    {
        "id": 58,
        "chinese": "大多数玩家寻找弃牌的理由。我寻找玩牌的理由。",
        "english": "Most players look for reasons to run. I look for reasons to play.",
        "author": "Daniel Negreanu"
    },
    {
        "id": 59,
        "chinese": "规则是这样的：你发现了一个人的破绽，你他妈的一个字都不要说。",
        "english": "The rule is this: you spot a man's tell, you don't say a word.",
        "author": "Mike McDermott, Rounders"
    },
    {
        "id": 60,
        "chinese": "如果你在桌子的前半小时找不到傻瓜，那你就是傻瓜。",
        "english": "If you can't spot the sucker in your first half hour at the table, then you are the sucker.",
        "author": "Mike McDermott, Rounders"
    },
    {
        "id": 61,
        "chinese": "你不能输掉你没有放进底池的东西。但你也不能赢多少。",
        "english": "You can't lose what you don't put in the middle. But you can't win much either.",
        "author": "Mike McDermott, Rounders"
    },
    {
        "id": 62,
        "chinese": "在扑克中，你从来不玩你的手。你玩的是你对面的那个人。",
        "english": "In poker you never play your hand. You play the man across from you.",
        "author": "James Bond, Casino Royale"
    },
    {
        "id": 63,
        "chinese": "最后一手差点要了我的命。",
        "english": "That last hand nearly killed me.",
        "author": "James Bond, Casino Royale"
    },
    {
        "id": 64,
        "chinese": "赢来的钱比赚来的钱甜两倍。",
        "english": "Money won is twice as sweet as money earned.",
        "author": "Paul Newman, The Color of Money"
    },
    {
        "id": 65,
        "chinese": "我不知道牌的事，但我觉得这四十五点胜过满堂红。",
        "english": "I don't know about cards but I think these 45's beat a full-house.",
        "author": "Omar, The Wire"
    },
    {
        "id": 66,
        "chinese": "重要的不是你赢还是输，重要的是你当时是否正确。",
        "english": "It's not whether you win or lose, it's whether you were right at the time.",
        "author": "Lancey Howard, The Cincinnati Kid"
    },
    {
        "id": 67,
        "chinese": "对于真正的赌徒来说，钱从来不是目的本身，它只是工具，就像语言之于思想。",
        "english": "To the true gambler, money is never an end in itself, it's simply a tool, as a language is to thought.",
        "author": "Lancey Howard, The Cincinnati Kid"
    },
    {
        "id": 68,
        "chinese": "我应该怎么做——当着其他人的面说他作弊比我厉害？",
        "english": "What was I supposed to do—call him for cheating better than me, in front of the others?",
        "author": "Doyle Lonnegan, The Sting"
    },
    {
        "id": 69,
        "chinese": "你无法虚张声势一个不专心的人。",
        "english": "You can't bluff someone who's not paying attention.",
        "author": "Mike, House of Games"
    },
    {
        "id": 70,
        "chinese": "你必须打你发的牌。有时你赢，有时你输。但至少你在游戏中。",
        "english": "You gotta play the cards you're dealt. Sometimes you win, sometimes you lose. But at least you're in the game.",
        "author": "Unknown"
    },
    {
        "id": 71,
        "chinese": "扑克是战争。人们假装它是个游戏。",
        "english": "Poker is war. People pretend it is a game.",
        "author": "Doyle Brunson"
    },
    {
        "id": 72,
        "chinese": "给我看一个好输家，我就给你看一个输家。",
        "english": "Show me a good loser, and I'll show you a loser.",
        "author": "Stu Ungar"
    },
    {
        "id": 73,
        "chinese": "你按你的方式赢筹码，我按我的方式赢筹码。",
        "english": "You get your chips your way, I'll get my chips mine.",
        "author": "Phil Ivey"
    },
    {
        "id": 74,
        "chinese": "为什么要推呢，让驴子拉不就行了？",
        "english": "Why do you pushing when the donkey will do the pulling?",
        "author": "Daniel Negreanu"
    },
    {
        "id": 75,
        "chinese": "你叫牌，宝贝，这就结束了！",
        "english": "You call, it's gonna be all over baby!",
        "author": "Scotty Nguyen"
    },
    {
        "id": 76,
        "chinese": "主赛事是扑克历史上唯一一个你从来不需要虚张声势的锦标赛。你只需要活下来，等着白痴把筹码给你。",
        "english": "The Main Event is the only tournament in the history of poker where you never have to bluff. You just have to stay alive and wait for the idiots to give you their chips.",
        "author": "Mike Matusow"
    },
    {
        "id": 77,
        "chinese": "赌博和赢是赌博，输也是赌博。",
        "english": "The next best thing to gambling and winning is gambling and losing.",
        "author": "Nick The Greek Dandolos"
    },
    {
        "id": 78,
        "chinese": "如果没有运气 involved，我每次都赢。",
        "english": "If there weren't luck involved, I would win every time.",
        "author": "Phil Hellmuth"
    },
    {
        "id": 79,
        "chinese": "没有太多玩家试图对我虚张声势。如果要偷鸡或偷盲，我会是那个做的人。",
        "english": "Not too many players try to bluff me. If there's going to be bluffing or stealing going on, I'm going to be the one doing to it.",
        "author": "Johnny Chan"
    },
    {
        "id": 80,
        "chinese": "今天是个笨蛋，明天是冠军。锦标赛扑克中一天能有多大变化！",
        "english": "One day a chump, the next day a champion. What a difference a day makes in tournament poker!",
        "author": "Mike Sexton"
    },
    {
        "id": 81,
        "chinese": "我最喜欢的筹码技巧是让每个人的筹码堆消失。",
        "english": "My favorite chip trick is to make everyone's chip stack disappear.",
        "author": "Amarillo Slim"
    },
    {
        "id": 82,
        "chinese": "避开那些有金牙想玩牌的人。",
        "english": "Avoid people with gold teeth who want to play cards.",
        "author": "George Carlin"
    },
    {
        "id": 83,
        "chinese": "上车！",
        "english": "On your bike!",
        "author": "Tony G"
    },
    {
        "id": 84,
        "chinese": "没有河牌，就没有鱼。",
        "english": "No river, no fish.",
        "author": "Amarillo Slim"
    },
    {
        "id": 85,
        "chinese": "Bad beats 会时不时像拿着空烟斗的瘾君子一样抢劫你。",
        "english": "Bad beats will, from time to time, still rob you like a crack addict with an empty pipe.",
        "author": "Rick Dacey"
    },
    {
        "id": 86,
        "chinese": "如果你总是从最差的手牌开始，你就永远不会有 bad beat 的故事可讲。",
        "english": "If you always start with the worst hand, you never have a bad beat story to tell.",
        "author": "Chuck Thompson"
    },
    {
        "id": 87,
        "chinese": "无限注：数小时的无聊，然后是瞬间的极度恐惧。",
        "english": "No-limit: Hours of boredom followed by moments of sheer terror.",
        "author": "Tom McEvoy"
    },
    {
        "id": 88,
        "chinese": "我必须抱怨牌洗得不好，直到我拿到一手好牌。",
        "english": "I must complain the cards are ill-shuffled till I have a good hand.",
        "author": "Jonathan Swift"
    },
    {
        "id": 89,
        "chinese": "生活就像扑克，有风险因素。不应该避免，应该面对。",
        "english": "Life, like poker, has an element of risk. It shouldn't be avoided. It should be faced.",
        "author": "Edward Norton"
    },
    {
        "id": 90,
        "chinese": "只有我一个人打败过我打牌；唯一能打败我的人是我自己。",
        "english": "There's no one who ever beat me playing cards; the only one who ever beat me was myself.",
        "author": "Stu Ungar"
    },
    {
        "id": 91,
        "chinese": "扑克向坦率的观察者揭示了其他重要的东西。它会教你了解自己的本性。许多糟糕的玩家无法提高，因为他们无法忍受自我认知。",
        "english": "Poker reveals to the frank observer something else of import. It will teach him about his own nature. Many bad players do not improve because they cannot bear self-knowledge.",
        "author": "David Mamet"
    },
    {
        "id": 92,
        "chinese": "给我看你的眼睛，就等于给我看你的手牌。",
        "english": "Show me your eyes and you may as well show me your cards.",
        "author": "Doyle Brunson"
    },
    {
        "id": 93,
        "chinese": "扑克不是一个温顺的人继承地球的游戏。",
        "english": "Poker is not a game in which the meek inherit the Earth.",
        "author": "David Hayano"
    },
    {
        "id": 94,
        "chinese": "胆小的心永远填不满黑桃同花。",
        "english": "A faint heart never filled a spade flush.",
        "author": "Unknown"
    },
    {
        "id": 95,
        "chinese": "当我们玩牌时，我们必须意识到，最重要的是我们要赚钱。",
        "english": "When we play, we must realize, before anything else, that we are out to make money.",
        "author": "David Sklansky"
    },
    {
        "id": 96,
        "chinese": "A 比生命更大，比山更高。",
        "english": "Aces are larger than life and greater than mountains.",
        "author": "Mike Caro"
    },
    {
        "id": 97,
        "chinese": "有钱的人不是有使命的人的对手。",
        "english": "A man with money is no match against a man on a mission.",
        "author": "Doyle Brunson"
    },
    {
        "id": 98,
        "chinese": "愿翻牌与你同在。",
        "english": "May the flop be with you.",
        "author": "Doyle Brunson"
    },
    {
        "id": 99,
        "chinese": "棒球就像扑克游戏。没人想输的时候退出；没人想让你赢的时候退出。",
        "english": "Baseball is like a poker game. Nobody wants to quit when he's losing; nobody wants you to quit when you're ahead.",
        "author": "Jackie Robinson"
    },
    {
        "id": 100,
        "chinese": "扑克玩家必须走运——就像沃伦·巴菲特年复一年在股市上走运一样。",
        "english": "A poker player has to get lucky – in the same way that Warren Buffett gets lucky playing the stock market year after year.",
        "author": "Phil Gordon"
    }
];

/**
 * 语录模块 - Quotes Module
 */
const quotes = {
    /**
     * 获取随机语录
     * @returns {Object} 随机选择的语录对象
     */
    getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * POKER_QUOTES.length);
        return POKER_QUOTES[randomIndex];
    },

    /**
     * 渲染语录到页面
     * @param {string} containerId - 容器元素ID
     */
    render(containerId = 'quoteContainer') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const quote = this.getRandomQuote();
        
        container.innerHTML = `
            <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">lightbulb</span>
                <div class="flex-1 min-w-0">
                    <span class="text-[10px] font-semibold text-primary uppercase tracking-wider">Poker Wisdom</span>
                    <p class="text-gray-900 dark:text-gray-100 text-sm font-medium mt-1 leading-relaxed">${this.escapeHtml(quote.chinese)}</p>
                    <p class="text-gray-500 dark:text-gray-400 text-xs mt-2 italic leading-relaxed">${this.escapeHtml(quote.english)}</p>
                    <p class="text-gray-400 dark:text-gray-500 text-xs mt-2 text-right">— ${this.escapeHtml(quote.author)}</p>
                </div>
            </div>
        `;
    },

    /**
     * HTML转义，防止XSS
     * @param {string} text - 原始文本
     * @returns {string} 转义后的文本
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * 初始化语录模块
     */
    init() {
        // 页面加载时渲染语录
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.render());
        } else {
            this.render();
        }
    }
};

// 注意：quotes.init() 在 index.html 中显式调用，不在此处自动执行
