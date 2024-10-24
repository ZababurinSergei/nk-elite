export const Reader = (self, containerFrame) => {
    return new Promise((resolve, reject) => {
        //////////
        // letiables.
        //////////
        let text;                       // Stores the text the reader will use.
        let textIndex = 0;              // The current character within the text (text[textIndex]).
        let wordStart = 0;              // The start of the current word.
        let wordUpdateTimer;            // Stores the identity of the setTimeout timer that updates the displayed word.
        let timerDelay;                 // Time in milliseconds before displaying the next word.
        let timerDelaySlope;            // Used to calculate the next timeout. Allows longer words to be displayed for a longer period of time.
        let timerDelayOffset;           // Used to calculate the next timeout. Allows longer words to be displayed for a longer period of time.
        let timerDelaySlopeMulti = 0.00;// Timer display slope for multiple word display.
        let timerDelaySlopeSingle = 0.00;// Timer display slope for single word display.
        let isPlaying = false;          // true if the player is displaying words or paused; otherwise false.
        let isPaused = false;           // true if the player is paused; otherwise false.
        let isTextAreaHidden = false;   // true if the textarea is hidden while reading; otherwise false.
        let areButtonsHidden = false;   // true if the control buttons are hidden while reading; otherwise false.
        let isInFirefox;                // true if this is running in Firefox; otherwise, false.
        let multiWordDisplay;           // true to display more than one word at a time; otherwise, false.
        let timeStartPause;             // The time when a pause began.
        let timeSpentPaused = 0;        // The time spent paused in milliseconds. Used to calculate the words per minute.
        let timeStartReading;           // The time when reading began in milliseconds from Jan 1, 1970. Used to calculate the words per minute.
        let wordCount = 0;              // The number of words that have been displayed. Used to calculate the words per minute.

        let max_word_length = 5000;       // Maximum word length to display. Longer words are hyphenated.
        let max_padding = 20;            // Maximum number of non-breaking spaces to add to the front of a displayed word.
        let max_speed = 2500;           // Arbitrary maximum number of words per minute to display.
        let min_speed = 50;             // Arbitrary minimum number of words per minute.
        let hyphenChars = '-\u2012\u2013\u2014\u2015\u2053';    // List of hyphen characters.
        let wordBreakChars = ' \n\r\t\f\v' + hyphenChars;       // List of characters that indicate the end of a word.
        let sentenceEnders = '.?!';                             // List of characters that indicate the end of a sentence.
        let paragraphEnders = '\n\r';                           // List of characters that indicate the end of a paragraph.
        let consonantLowValue = '3';    // The lowest value for a consonant.
        let consonantHighValue = '4';   // The highest value for a consonant.
        let consonants;                 // List of consonants, created during initialization.

        // Strings for the buttons.
        let startString = '\u25ba';
        let stopString = '\u25a0';
        let pauseString = '\u258c\u2590';
        let resumeString = '\u2551\u2551';
        let goBackString = '\u25c4\u25c4';
        let goForwardString = '\u25ba\u25ba';
        let goSlowerString = '\u25bc';
        let goFasterString = '\u25b2';

        // Letters, and their corresponding value scores, to use when choosing which letter will be the highlight
        // letter within a word. Typically, vowels score a 5, and consonants are a 3. The letter's value is
        // multiplied by its position value within a word (highlightCurveValue[word.length][letterPosition]), and
        // the letter with the highest score becomes the highlighted letter. For example, for a four-letter word,
        // word, the highlightCurveValue is "4973". Using the word "from", f=3*4=12, r=3*9=27 o=5*7=35 m=3*3=9,
        // the letter "o" has the highest score of 35 and becomes the highlighted letter.

        // Basic Latin.
        let h01 = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,./';
        let v01 = '354345333534434533444533343543453335344345334445333433111111111212';

        // Yes, I know, this is not the most efficient way to create my lookup strings. I chose editability over
        // minification for the moment. Also, I had some issues with editors messing up these characters, so I
        // chose this way to preserve them.

        // Latin-1 Supplement.
        let h02 = '\u00c0\u00c1\u00c2\u00c3\u00c4\u00c5\u00c6\u00c7\u00c8\u00c9\u00ca\u00cb\u00cc\u00cd\u00ce\u00cf';
        let v02 = '5555555355555555';
        let h03 = '\u00d0\u00d1\u00d2\u00d3\u00d4\u00d5\u00d6\u00d7\u00d8\u00d9\u00da\u00db\u00dc\u00dd\u00de\u00df';
        let v03 = '3355555155555533';
        let h04 = '\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5\u00e6\u00e7\u00e8\u00e9\u00ea\u00eb\u00ec\u00ed\u00ee\u00ef';
        let v04 = '5555555355555555';
        let h05 = '\u00f0\u00f1\u00f2\u00f3\u00f4\u00f5\u00f6\u00f7\u00f8\u00f9\u00fa\u00fb\u00fc\u00fd\u00fe\u00ff';
        let v05 = '3355555055555535';

        // Latin Extended-A.
        let h06 = '\u0100\u0101\u0102\u0103\u0104\u0105\u0106\u0107\u0108\u0109\u010a\u010b\u010c\u010d\u010e\u010f';
        let v06 = '5555553333333333';
        let h07 = '\u0110\u0111\u0112\u0113\u0114\u0115\u0116\u0117\u0118\u0119\u011a\u011b\u011c\u011d\u011e\u011f';
        let v07 = '3355555555553333';
        let h08 = '\u0120\u0121\u0122\u0123\u0124\u0125\u0126\u0127\u0128\u0129\u012a\u012b\u012c\u012d\u012e\u012f';
        let v08 = '3333333355555555';
        let h09 = '\u0130\u0131\u0132\u0133\u0134\u0135\u0136\u0137\u0138\u0139\u013a\u013b\u013c\u013d\u013e\u013f';
        let v09 = '5555333333333333';
        let h10 = '\u0140\u0141\u0142\u0143\u0144\u0145\u0146\u0147\u0148\u0149\u014a\u014b\u014c\u014d\u014e\u014f';
        let v10 = '3333333333335555';
        let h11 = '\u0150\u0151\u0152\u0153\u0154\u0155\u0156\u0157\u0158\u0159\u015a\u015b\u015c\u015d\u015e\u015f';
        let v11 = '5555333333333333';
        let h12 = '\u0160\u0161\u0162\u0163\u0164\u0165\u0166\u0167\u0168\u0169\u016a\u016b\u016c\u016d\u016e\u016f';
        let v12 = '3333333355555555';
        let h13 = '\u0170\u0171\u0172\u0173\u0174\u0175\u0176\u0177\u0178\u0179\u017a\u017b\u017c\u017d\u017e\u017f';
        let v13 = '5555335553333333';

        // Latin Extended-B.
        let h14 = '\u0180\u0181\u0182\u0183\u0184\u0185\u0186\u0187\u0188\u0189\u018a\u018b\u018c\u018d\u018e\u018f';
        let v14 = '3333333333333355';
        let h15 = '\u0190\u0191\u0192\u0193\u0194\u0195\u0196\u0197\u0198\u0199\u019a\u019b\u019c\u019d\u019e\u019f';
        let v15 = '5333335533333335';
        let h16 = '\u01a0\u01a1\u01a2\u01a3\u01a4\u01a5\u01a6\u01a7\u01a8\u01a9\u01aa\u01ab\u01ac\u01ad\u01ae\u01af';
        let v16 = '5555333333333335';
        let h17 = '\u01b0\u01b1\u01b2\u01b3\u01b4\u01b5\u01b6\u01b7\u01b8\u01b9\u01ba\u01bb\u01bc\u01bd\u01be\u01bf';
        let v17 = '5535533333333333';
        let h18 = '\u01c0\u01c1\u01c2\u01c3\u01c4\u01c5\u01c6\u01c7\u01c8\u01c9\u01ca\u01cb\u01cc\u01cd\u01ce\u01cf';
        let v18 = '3333333333333555';
        let h19 = '\u01d0\u01d1\u01d2\u01d3\u01d4\u01d5\u01d6\u01d7\u01d8\u01d9\u01da\u01db\u01dc\u01dd\u01de\u01df';
        let v19 = '5555555555555555';
        let h20 = '\u01e0\u01e1\u01e2\u01e3\u01e4\u01e5\u01e6\u01e7\u01e8\u01e9\u01ea\u01eb\u01ec\u01ed\u01ee\u01ef';
        let v20 = '5555333333555533';
        let h21 = '\u01f0\u01f1\u01f2\u01f3\u01f4\u01f5\u01f6\u01f7\u01f8\u01f9\u01fa\u01fb\u01fc\u01fd\u01fe\u01ff';
        let v21 = '3333333333555555';
        let h22 = '\u0200\u0201\u0202\u0203\u0204\u0205\u0206\u0207\u0208\u0209\u020a\u020b\u020c\u020d\u020e\u020f';
        let v22 = '5555555555555555';
        let h23 = '\u0210\u0211\u0212\u0213\u0214\u0215\u0216\u0217\u0218\u0219\u021a\u021b\u021c\u021d\u021e\u021f';
        let v23 = '3333555533333333';
        let h24 = '\u0220\u0221\u0222\u0223\u0224\u0225\u0226\u0227\u0228\u0229\u022a\u022b\u022c\u022d\u022e\u022f';
        let v24 = '3355335555555555';
        let h25 = '\u0230\u0231\u0232\u0233\u0234\u0235\u0236\u0237\u0238\u0239\u023a\u023b\u023c\u023d\u023e\u023f';
        let v25 = '5555333033533333';
        let h26 = '\u0240\u0241\u0242\u0243\u0244\u0245\u0246\u0247\u0248\u0249\u024a\u024b\u024c\u024d\u024e\u024f';
        let v26 = '3333535533333355';

        // Latin Extended Additional.
        let h27 = '\u1e00\u1e01\u1e02\u1e03\u1e04\u1e05\u1e06\u1e07\u1e08\u1e09\u1e0a\u1e0b\u1e0c\u1e0d\u1e0e\u1e0f';
        let v27 = '5533333333333333';
        let h28 = '\u1e10\u1e11\u1e12\u1e13\u1e14\u1e15\u1e16\u1e17\u1e18\u1e19\u1e1a\u1e1b\u1e1c\u1e1d\u1e1e\u1e1f';
        let v28 = '3333555555555533';
        let h29 = '\u1e20\u1e21\u1e22\u1e23\u1e24\u1e25\u1e26\u1e27\u1e28\u1e29\u1e2a\u1e2b\u1e2c\u1e2d\u1e2e\u1e2f';
        let v29 = '3333333333335555';
        let h30 = '\u1e30\u1e31\u1e32\u1e33\u1e34\u1e35\u1e36\u1e37\u1e38\u1e39\u1e3a\u1e3b\u1e3c\u1e3d\u1e3e\u1e3f';
        let v30 = '3333333333333333';
        let h31 = '\u1e40\u1e41\u1e42\u1e43\u1e44\u1e45\u1e46\u1e47\u1e48\u1e49\u1e4a\u1e4b\u1e4c\u1e4d\u1e4e\u1e4f';
        let v31 = '3333333333335555';
        let h32 = '\u1e50\u1e51\u1e52\u1e53\u1e54\u1e55\u1e56\u1e57\u1e58\u1e59\u1e5a\u1e5b\u1e5c\u1e5d\u1e5e\u1e5f';
        let v32 = '5555333333333333';
        let h33 = '\u1e60\u1e61\u1e62\u1e63\u1e64\u1e65\u1e66\u1e67\u1e68\u1e69\u1e6a\u1e6b\u1e6c\u1e6d\u1e6e\u1e6f';
        let v33 = '3333333333333333';
        let h34 = '\u1e70\u1e71\u1e72\u1e73\u1e74\u1e75\u1e76\u1e77\u1e78\u1e79\u1e7a\u1e7b\u1e7c\u1e7d\u1e7e\u1e7f';
        let v34 = '3355555555553333';
        let h35 = '\u1e80\u1e81\u1e82\u1e83\u1e84\u1e85\u1e86\u1e87\u1e88\u1e89\u1e8a\u1e8b\u1e8c\u1e8d\u1e8e\u1e8f';
        let v35 = '3333333333333355';
        let h36 = '\u1e90\u1e91\u1e92\u1e93\u1e94\u1e95\u1e96\u1e97\u1e98\u1e99\u1e9a\u1e9b\u1e9c\u1e9d\u1e9e\u1e9f';
        let v36 = '3333333335533333';
        let h37 = '\u1ea0\u1ea1\u1ea2\u1ea3\u1ea4\u1ea5\u1ea6\u1ea7\u1ea8\u1ea9\u1eaa\u1eab\u1eac\u1ead\u1eae\u1eaf';
        let v37 = '5555555555555555';
        let h38 = '\u1eb0\u1eb1\u1eb2\u1eb3\u1eb4\u1eb5\u1eb6\u1eb7\u1eb8\u1eb9\u1eba\u1ebb\u1ebc\u1ebd\u1ebe\u1ebf';
        let v38 = '5555555555555555';
        let h39 = '\u1ec0\u1ec1\u1ec2\u1ec3\u1ec4\u1ec5\u1ec6\u1ec7\u1ec8\u1ec9\u1eca\u1ecb\u1ecc\u1ecd\u1ece\u1ecf';
        let v39 = '5555555555555555';
        let h40 = '\u1ed0\u1ed1\u1ed2\u1ed3\u1ed4\u1ed5\u1ed6\u1ed7\u1ed8\u1ed9\u1eda\u1edb\u1edc\u1edd\u1ede\u1edf';
        let v40 = '5555555555555555';
        let h41 = '\u1ee0\u1ee1\u1ee2\u1ee3\u1ee4\u1ee5\u1ee6\u1ee7\u1ee8\u1ee9\u1eea\u1eeb\u1eec\u1eed\u1eee\u1eef';
        let v41 = '5555555555555555';
        let h42 = '\u1ef0\u1ef1\u1ef2\u1ef3\u1ef4\u1ef5\u1ef6\u1ef7\u1ef8\u1ef9\u1efa\u1efb\u1efc\u1efd\u1efe\u1eff';
        let v42 = '5555555555333355';

        // Cyrillic.
        let h43 = '\u0400\u0401\u0402\u0403\u0404\u0405\u0406\u0407\u0408\u0409\u040a\u040b\u040c\u040d\u040e\u040f';
        let v43 = '5533535533333553';
        let h44 = '\u0410\u0411\u0412\u0413\u0414\u0415\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f';
        let v44 = '5333353354333353';
        let h45 = '\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042b\u042c\u042d\u042e\u042f';
        let v45 = '3335333333333555';
        let h46 = '\u0430\u0431\u0432\u0433\u0434\u0435\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f';
        let v46 = '5333353354333353';
        let h47 = '\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f';
        let v47 = '3335333333333555';
        let h48 = '\u0450\u0451\u0452\u0453\u0454\u0455\u0456\u0457\u0458\u0459\u045a\u045b\u045c\u045d\u045e\u045f';
        let v48 = '5533535533333453';
        let h49 = '\u0460\u0461\u0462\u0463\u0464\u0465\u0466\u0467\u0468\u0469\u046a\u046b\u046c\u046d\u046e\u046f';
        let v49 = '3333553333333333';
        let h50 = '\u0470\u0471\u0472\u0473\u0474\u0475\u0476\u0477\u0478\u0479\u047a\u047b\u047c\u047d\u047e\u047f';
        let v50 = '3333333333333333';
        let h51 = '\u0480\u0481\u0482\u0483\u0484\u0485\u0486\u0487\u0488\u0489\u048a\u048b\u048c\u048d\u048e\u048f';
        let v51 = '3311000000333333';
        let h52 = '\u0490\u0491\u0492\u0493\u0494\u0495\u0496\u0497\u0498\u0499\u049a\u049b\u049c\u049d\u049e\u049f';
        let v52 = '3333333333333333';
        let h53 = '\u04a0\u04a1\u04a2\u04a3\u04a4\u04a5\u04a6\u04a7\u04a8\u04a9\u04aa\u04ab\u04ac\u04ad\u04ae\u04af';
        let v53 = '3333333333333355';
        let h54 = '\u04b0\u04b1\u04b2\u04b3\u04b4\u04b5\u04b6\u04b7\u04b8\u04b9\u04ba\u04bb\u04bc\u04bd\u04be\u04bf';
        let v54 = '5533333333333333';
        let h55 = '\u04c0\u04c1\u04c2\u04c3\u04c4\u04c5\u04c6\u04c7\u04c8\u04c9\u04ca\u04cb\u04cc\u04cd\u04ce\u04cf';
        let v55 = '3333333333333333';
        let h56 = '\u04d0\u04d1\u04d2\u04d3\u04d4\u04d5\u04d6\u04d7\u04d8\u04d9\u04da\u04db\u04dc\u04dd\u04de\u04df';
        let v56 = '5555555555553333';
        let h57 = '\u04e0\u04e1\u04e2\u04e3\u04e4\u04e5\u04e6\u04e7\u04e8\u04e9\u04ea\u04eb\u04ec\u04ed\u04ee\u04ef';
        let v57 = '3355555555555555';
        let h58 = '\u04f0\u04f1\u04f2\u04f3\u04f4\u04f5\u04f6\u04f7\u04f8\u04f9\u04fa\u04fb\u04fc\u04fd\u04fe\u04ff';
        let v58 = '5555333355333333';

        // Cyrillic Supplement.
        let h59 = '\u0500\u0501\u0502\u0503\u0504\u0505\u0506\u0507\u0508\u0509\u050a\u050b\u050c\u050d\u050e\u050f';
        let v59 = '3333333333333333';
        let h60 = '\u0510\u0511\u0512\u0513\u0514\u0515\u0516\u0517\u0518\u0519\u051a\u051b\u051c\u051d\u051e\u051f';
        let v60 = '3333333355333333';
        let h61 = '\u0520\u0521\u0522\u0523\u0524\u0525\u0526\u0527';
        let v61 = '33333333';

        let highlightLetters = h01 + h02 + h03 + h04 + h05 + h06 + h07 + h08 + h09 + h10 + h11 + h12 + h13 + h14 + h15 + h16 + h17 + h18 + h19 + h20 + h21 + h22 + h23 + h24 + h25 + h26 + h27 + h28 + h29 + h30 + h31 + h32 + h33 + h34 + h35 + h36 + h37 + h38 + h39 + h40 + h41 + h42 +
            h43 + h44 + h45 + h46 + h47 + h48 + h49 + h50 + h51 + h52 + h53 + h54 + h55 + h56 + h57 + h58 + h59 + h60 + h61;
        let highlightLetterValue = v01 + v02 + v03 + v04 + v05 + v06 + v07 + v08 + v09 + v10 + v11 + v12 + v13 + v14 + v15 + v16 + v17 + v18 + v19 + v20 + v21 + v22 + v23 + v24 + v25 + v26 + v27 + v28 + v29 + v30 + v31 + v32 + v33 + v34 + v35 + v36 + v37 + v38 + v39 + v40 + v41 + v42 +
            v43 + v44 + v45 + v46 + v47 + v48 + v49 + v50 + v51 + v52 + v53 + v54 + v55 + v56 + v57 + v58 + v59 + v60 + v61;
        let highlightCurveValue = ['', '9', '99', '796', '4973', '47952', '469742', '3689631', '34786421', '247964210', '1258984300', '12358975000', '123579760000', '1235798600000', '123579860000000', '123579860000000000', , '12358975000', '123579760000', '1235798600000', '123579860000000', '123579860000000000', '12358975000', '123579760000', '1235798600000', '123579860000000', '123579860000000000', '1235798600000', '123579860000000', '123579860000000000', , '12358975000', '123579760000', '1235798600000', '123579860000000', '123579860000000000', '12358975000', '123579760000', '1235798600000', '123579860000000', '123579860000000000', '1235798600000', '123579860000000', '123579860000000000', , '12358975000', '123579760000', '1235798600000', '123579860000000', '123579860000000000', '12358975000', '123579760000', '1235798600000', '123579860000000', '123579860000000000', '123579760000', '1235798600000', '123579860000000', '123579860000000000', '123579760000', '1235798600000', '123579860000000', '123579860000000000', '123579760000', '1235798600000', '123579860000000', '123579860000000000', '123579760000', '1235798600000', '123579860000000', '123579860000000000'];

        // HTML Elements.
        let mainDiv;                // The main div for the page.
        let outputDiv;              // The div for the display word.
        let outputTextElement;      // The span for the display word.
        let progressBarBaseDiv;     // The fixed part of the progress bar.
        let progressBarDiv;         // The letiable part of the progress bar.
        let inputTextArea;          // The textarea that stores the text to read.
        let speedInputElement;      // The Word per minute textbox.
        let startStopButton;        // The button that starts and stops the reader.
        let pauseResumeButton;      // The button that pauses and resumes the reader.
        let goBackButton;           // The Go Back button.
        let goForwardButton;        // The Go Forward button.
        let slowerButton;           // The Slower button.
        let fasterButton;           // The Faster button.
        let hideTextAreaCheckBox;   // The checkbox to hide or unhide the textarea while reading.
        let hideButtonsCheckBox;    // The checkbox to also hide or unhide the control buttons while reading.
        let alsoTextSpan;           // The text span for the "Also hide buttons" text, to give it the appearance of being disabled.
        let inputTextAreaDiv;       // The div that contains the textarea and other elements to hide when reading.
        let controlButtons;         // The div that contains the control buttons. Allows control buttons to be hidden while reading.
        let multiWordCheckBox;      // The checkbox to allow display of more than one word at a time.
        let wpmDisplay;             // The span to display the words per minute.

        mainDiv = self.shadowRoot.getElementById('mainDiv');
        outputDiv = self.shadowRoot.getElementById('outputDiv');
        outputTextElement = self.shadowRoot.getElementById('outputTextElement');
        progressBarBaseDiv = self.shadowRoot.getElementById('progressBarBaseDiv');
        progressBarDiv = self.shadowRoot.getElementById('progressBarDiv');
        inputTextArea = self.shadowRoot.getElementById('inputTextArea');
        speedInputElement = self.shadowRoot.getElementById('speedInputElement');
        startStopButton = self.shadowRoot.getElementById('startStopButton');
        pauseResumeButton = self.shadowRoot.getElementById('pauseResumeButton');
        goBackButton = self.shadowRoot.getElementById('goBackButton');
        goForwardButton = self.shadowRoot.getElementById('goForwardButton');
        slowerButton = self.shadowRoot.getElementById('slowerButton');
        fasterButton = self.shadowRoot.getElementById('fasterButton');
        hideTextAreaCheckBox = self.shadowRoot.getElementById('hideTextArea');
        hideButtonsCheckBox = self.shadowRoot.getElementById('hideButtons');
        alsoTextSpan = self.shadowRoot.getElementById('alsoTextSpan');
        inputTextAreaDiv = self.shadowRoot.getElementById('inputTextAreaDiv');
        controlButtons = self.shadowRoot.getElementById('controlButtons');
        multiWordCheckBox = self.shadowRoot.getElementById('multiWordCheckBox');
        wpmDisplay = self.shadowRoot.getElementById('wpmDisplay');
        let readableStream = self.shadowRoot.querySelector('.readable-stream');

        const oscAudio = 'osc_audio';
        const oscAudioFrame = 'osc_audio_frame';
        const oscText = 'osc_text';

        const defaultData = {
            limit: 16
        };

        let isAudio = self.dataset.field === oscAudio || self.dataset.field === oscAudioFrame  || self.dataset.field === oscText;
        let isSample = self.dataset.field === oscAudio || self.dataset.field === oscText;
        let isFrame = self.dataset.field === oscAudioFrame
        let countData = 0;
        let isNextSamle = 0;
        let indexSamle = 1;

        let nextSamle = {
            start: 0
        };

        let leftLimit = '';
        let limit = structuredClone(defaultData.limit);
        let count2Limit = -1;
        let count = 0;
        let isCountFull = false;
        let isNextFull = false;
        let isSecondStep = true;
        let word = '';
        const isFocus = true;
        let isLastWords = false;
        let indexWords = -1;
        let isLastChar = false;

        //////////
        // Functions.
        //////////


        // Updates the word on the display with the next word.

        let updateWord = function() {
            ++indexWords;
            
            // Used to calculate how long the processing takes to obtain the word.
            let startProcessingTime = Date.now();

            if (isSample && nextSamle?.textIndex) {
                textIndex = nextSamle.textIndex;
            }

            if (isNextFull) {
                if (nextSamle.previous) {
                    textIndex = parseInt(nextSamle.previous, 10);
                    nextSamle.previous = false;
                }
            }

            word = nextWord();
            // console.log('🟢', word);

            // Display the word.
            word = word.replace(/\n/g, ' ');

            const spiltWorlds = word.split(' ');

            displayWord(word, spiltWorlds.length === 0);

            if (!isLastChar && word && (spiltWorlds.length !== 0 || limit === 0)) {
                // If the word is shorter than four letters, use a four letter delay for this word
                let nextDelay;
                if (word.length < 4) {
                    nextDelay = (4 * timerDelaySlope + timerDelayOffset) * timerDelay;
                } else {
                    nextDelay = (word.length * timerDelaySlope + timerDelayOffset) * timerDelay;
                }

                // Compensate for time spent processing this word.
                nextDelay = Math.max(0, nextDelay - (Date.now() - startProcessingTime));

                // document.dispatchEvent(new CustomEvent(`next-frame`, {
                //     detail: {
                //         id: self.dataset.id,
                //         type: 'frame'
                //     }
                // }));

                wordUpdateTimer = setTimeout(function() { updateWord() }, nextDelay);
            } else {
                setStopState('updateWord');
            }
        };

        // Displays the word on the screen, and selects the word in the textarea.
        // Param: word. The word to display on the screen. Used only to identify end of text to read.
        // Scrolls the textarea to reveal the selected word.

        let displayWord = function(word, isEnd) {
            if (word) {
                // Display the word with its hightlight.
                outputTextElement.innerHTML = padAndHighlightWord(word, isEnd);

                // Select the word in the text area.
                selectWordInTextArea(wordStart, isLastWords ? text.length : textIndex);

                // Update the progress bar.
                updateProgressBar(textIndex, text.length);

                // Display the words per minute.
                displayWordsPerMinute();
            }
        };

        // Selects the word in the textArea.
        // Param: start. Starting point of the selection.
        // Param: end. ending point of the selection.

        let selectWordInTextArea = function(start, end) {
            // If this isn't Firefox, scroll the textArea so the selected word is visible.
            //   This happens automatically in Firefox.
            if (!isInFirefox) {
                // Select the word in the textarea.

                // Save the text.
                let originalText = readableStream.value;

                // Put in the text before the current word.
                readableStream.value = originalText.substring(0, start);

                // Find the right place to scroll to.
                // inputTextArea.scrollTop = 10000000; // Large enough, I hope.
                // let currentScrollTop = inputTextArea.scrollTop;

                // Restore the original text.
                readableStream.value = originalText;

                // Scroll to the right place.
                // if (currentScrollTop > 0) {
                    // Put the selection at the lower fourth of the displayed textArea.
                    // inputTextArea.scrollTop = currentScrollTop + (Math.floor(inputTextArea.clientHeight / 4));
                // }
            }


            const left = readableStream.value.substring(0, start);
            const center = readableStream.value.substring(start - 1, end);
            const right = readableStream.value.substring(end);

            if(limit === 0) {
                inputTextArea.textContent = ``
                inputTextArea.value = ''
                inputTextArea.insertAdjacentHTML('afterbegin',`<span class="onair">${left}</span><span class="active center">${center.trim()}</span>${right}`)
            } else {
                if(isNextFull) {
                    let indexWindow = 0
                    if (limit %2 === 0) {
                        indexWindow = limit / 2;
                    } else {
                        indexWindow = (limit - 1) / 2;
                    }

                    const isThird = indexWords <= indexWindow * 3
                    const splitWorld = center.trim().split(' ')

                    let index = 0
                    if (splitWorld.length %2 === 0) {
                        index = splitWorld.length / 2;
                    } else {
                        index = (splitWorld.length - 1) / 2;
                    }

                    let leftCenter= splitWorld.slice(0, index)
                    let activeCenter = splitWorld.slice(index, index + 1)
                    let rightCenter= splitWorld.slice(index + 1)

                    const popActive = activeCenter.pop()
                    activeCenter.push(leftCenter.shift())
                    leftCenter.push(popActive)

                    document.dispatchEvent(new CustomEvent(`next-frame`, {
                        detail: {
                            value: parseFloat(activeCenter[0]),
                            id: self.dataset.id,
                            type: 'frame'
                        }
                    }));
                    inputTextArea.textContent = ``
                    inputTextArea.value = ''
                    inputTextArea.insertAdjacentHTML('afterbegin',`<span class="onair">${left}</span><span class="active">${leftCenter.join(' ').trim()} <span class="center">${activeCenter.join('  ').trim()}</span> ${rightCenter.join(' ').trim()}</span>${right}`)
                } else {
                    const splitWorld = center.split(' ')
                    let index = 0
                    if (limit %2 === 0) {
                        index = limit / 2;
                    } else {
                        index = (limit - 1) / 2;
                    }

                    if(indexWords >= index ) {
                        let leftCenter = splitWorld.slice(0, index)
                        let activeCenter= splitWorld.slice(index, index + 1)
                        let rightCenter= splitWorld.slice(index + 1)
                        if(rightCenter.length === 0) {
                            inputTextArea.textContent = ``
                            inputTextArea.value = ''
                            inputTextArea.insertAdjacentHTML('afterbegin',`<span class="onair">${left}</span><span class="active">${leftCenter.join(' ').trim()} <span class="center">${activeCenter.join('  ').trim()}</span></span>${right}`)
                        } else {
                            let popLeft = []

                            popLeft.push(activeCenter.pop())

                            for(let i = 0; i < rightCenter.length;++i){
                                if(i === 0) {
                                    activeCenter.push(leftCenter.pop())
                                    leftCenter.unshift(popLeft.pop())
                                } else {
                                    if(i === 1) {
                                        popLeft.push(activeCenter.pop())
                                        activeCenter.push(leftCenter.pop())
                                        leftCenter = popLeft.concat(leftCenter)
                                        popLeft = []
                                    } else {
                                        let pop = activeCenter.pop()
                                        activeCenter.push(leftCenter.pop())
                                        leftCenter.unshift(pop)
                                    }
                                }
                            }

                            inputTextArea.textContent = ``
                            inputTextArea.value = ''
                            inputTextArea.insertAdjacentHTML('afterbegin',`<span class="onair">${left}</span><span class="active">${leftCenter.join(' ').trim()} <span class="center">${activeCenter.join('  ').trim()}</span> ${rightCenter.join(' ').trim()}</span>${right}`)
                        }
                    } else {

                        inputTextArea.textContent = ``
                        inputTextArea.value = ''
                        inputTextArea.insertAdjacentHTML('afterbegin',`<span class="onair">${left}</span><span class="active">${center.trim()}</span>${right}`)
                    }
                }
            }
        };

        // Updates the progress bar.
        // Param: progress. The progress toward the limit.
        // Param: limit. The limit of progress to display.

        let updateProgressBar = function(progress, limit) {
            let divWidth = Math.floor((progress / limit) * progressBarBaseDiv.clientWidth);
            progressBarDiv.setAttribute('style', 'width:' + divWidth + 'px');
        };


        // Calculates and displays the current reading speed in words per minute.
        let displayWordsPerMinute = function() {
            // Only display words per minute after 20 words (40 for multiWordDisplayhave been read.
            if ((!multiWordDisplay && wordCount > 20) || (multiWordDisplay && wordCount > 40)) {
                // Calculate the time spent reading, without counting the time paused.
                let timeSpentReading = new Date().getTime() - timeStartReading - timeSpentPaused;

                // Calculate the words per minute to the first decimal place.
                let wpm = Math.floor(wordCount * 1000 * 60 * 10 / timeSpentReading) / 10;

                // Display the words per minute.
                wpmDisplay.innerHTML = wpm;
            }
        };

        // Parses the string to identify the next word to display.
        // Returns the next word to display.
        // Sets textIndex and wordStart to identify the word.
        let nextWord = function() {
            let firstWordFound = false;     // true when the end of the first word is found.
            let firstWordEnd;               // the end location of the first word.


            // if(!isFrame) {
                // Save the starting location of the word.
                if (isNextFull) {
                    wordStart = textIndex;
                } else {
                    wordStart = 0;
                }
            // }


            while (textIndex < text.length && wordBreakChars.indexOf(text[textIndex]) > -1) {
                ++textIndex;
            }


            // Search ahead to find the end of the word.
            --textIndex;
            leftLimit = wordStart;
            isNextSamle = 0;

            isCountFull = count2Limit >= limit;

            if (!isCountFull) {
                isNextFull = (count2Limit + 1) >= limit;
                ++count2Limit;
            }

            const spiltWorlds = text.split(' ');

            do {
                ++textIndex;
                if (wordBreakChars.indexOf(text[textIndex]) > -1) {
                    ++isNextSamle;

                    if (isSample && isNextSamle === indexSamle) {
                        nextSamle.start = textIndex;
                        nextSamle.previous = nextSamle.previous;
                        nextSamle.text = text.substring(leftLimit, textIndex);
                        nextSamle.leftLimit = leftLimit;
                        nextSamle.textIndex = textIndex + 1;

                        if (isSecondStep) {
                            nextSamle.secondStep = textIndex + 1;
                            isSecondStep = false;
                        }
                    }

                    if (isNextFull) {
                        leftLimit = wordStart;
                    } else {
                        leftLimit = 0;
                    }

                    // Word break found. Was it a hyphen?
                    if (hyphenChars.indexOf(text[textIndex]) > -1) {
                        // On rare occasion, a hyphen will be found just after a max_word_length word (ie., "subscriptions-").
                        //      If that happens, break out. Adding the hyphen will make the word > max_word_length.
                        if (textIndex - wordStart >= max_word_length) {
                            //console.log('----------  OUT DATA 3 -------------', wordStart);
                            break;
                        }

                        if (multiWordDisplay && firstWordFound === false) {
                            if (limit === 0) {
                                const result = text.substring(wordStart, textIndex - wordStart + 1);
                                //console.log('------------ OUT DATA 2 ------------', result);

                                return result;
                            } else if (count2Limit < limit) {
                                ++wordCount;
                                firstWordFound = true;
                                firstWordEnd = textIndex + 1;
                            } else {
                                ++wordCount;
                                firstWordFound = true;
                                firstWordEnd = textIndex + 1;
                            }
                        } else {
                            ++wordCount;
                        }
                    } else {

                        if (multiWordDisplay && firstWordFound === false) {
                            if (isCountFull) {
                                if (limit === 0) {
                                    const result = text.substring(wordStart, textIndex);
                                    //console.log('----------  OUT DATA -2 -------------', result);
                                    return result;
                                } else {
                                    ++wordCount;
                                    ++count;
                                    firstWordFound = true;
                                    firstWordEnd = textIndex;
                                }
                            } else {
                                const result = text.substring(wordStart, textIndex - wordStart);
                                if (!isNextFull) {
                                    nextSamle.previous = nextSamle.secondStep;
                                }
                                //console.log('----------  OUT DATA 0 -------------', result, isNextFull);
                                return result;
                            }

                        } else {
                            // Return the word with its hyphen.
                            let result = '';
                            if (isLastWords) {
                                result = text.substring(wordStart, text.length);
                            } else {
                                result = text.substring(wordStart, textIndex);
                            }

                            if (count >= count2Limit) {
                                count = 0;
                                //console.log('----------  OUT DATA 4 -------------', result);
                                return result;
                            }

                            ++count;
                        }
                    }
                } else {
                    if (indexWords >= spiltWorlds.length) {
                        isLastWords = true;
                    }
                }
            }
            while (textIndex < text.length && textIndex - wordStart < max_word_length);

            // If the second word was too long, return only the first word.
            if (firstWordFound) {
                let result = '';
                if (!isAudio) {
                    textIndex = firstWordEnd;
                    result = text.substring(wordStart, textIndex - wordStart);
                } else {
                    result = text.substring(wordStart, textIndex);
                }

                //console.log('--------- OUT DATA 2 -------------', result);
                return result;
            }

            // Process the last word.
            if (textIndex != text.length) {
                if (limit === 0) {

                    return '';
                } else {
                    
                    let returnString = text.substring(wordStart, text.length - wordStart);
                    //console.log('--------- OUT DATA 6 -------------', returnString)
                    return returnString;
                }
            } else {
                let returnString = text.substring(wordStart, text.length);
                //console.log('--------- OUT DATA END -------------', returnString)
                isLastChar = true;
                return returnString;
            }

            // The word is longer than max_word_length. Choose a subset of the current word.
            return hyphenateWord();
        };

        // Hyphenate the word at text[wordStart] through text[textIndex].
        // Returns the first part of the hyphenated word, with the hyphen.

        let hyphenateWord = function() {
            let returnString;
            let i, i2;


            //console.log('ddddddddddddddddddd', wordStart);
            //

            // Find the end of this word, or another max_word_length - 1 characters.
            let longWordEnd = textIndex + 1;
            while (longWordEnd < text.length &&
            longWordEnd - wordStart < max_word_length * 2 - 1 &&
            wordBreakChars.indexOf(text[longWordEnd]) === -1) {
                ++longWordEnd;
            }

            // Find the middle of the long word.
            let wordMiddle = Math.floor((longWordEnd + wordStart) / 2);

            // Determine if this is a CamelCase word: Find a lowercase letter with an uppercase letter after it.
            for (i = 1; i < max_word_length - 1; ++i) {
                if (text[wordStart + i].toLowerCase() === text[wordStart + i] && text[wordStart + i + 1].toUpperCase() === text[wordStart + i + 1]) {
                    // This is a CamelCase word. Hyphenate on the upper case letter.

                    // Look backward and forward from the middle of the word to find a place to hyphenate.
                    for (i2 = 0; wordMiddle - i2 > wordStart + 2; ++i2) {
                        if (wordMiddle + i2 + 1 < textIndex &&
                            text[wordMiddle + i2].toLowerCase() === text[wordMiddle + i2] &&
                            text[wordMiddle + i2 + 1].toUpperCase() === text[wordMiddle + i2 + 1]) {
                            textIndex = wordMiddle + i2 + 1;
                            returnString = text.substring(wordStart, textIndex - wordStart) + '-';
                            // //console.log('--- hyphenateWord 1 ----', returnString)
                            return returnString;
                        }

                        if (text[wordMiddle - i2].toLowerCase() === text[wordMiddle - i2] &&
                            text[wordMiddle - i2 - 1].toUpperCase() === text[wordMiddle - i2 - 1]) {
                            textIndex = wordMiddle - i2 - 1;
                            returnString = text.substring(wordStart, textIndex - wordStart) + '-';
                            // //console.log('--- hyphenateWord 2 ----', returnString)
                            return returnString;
                        }
                    }
                }
            }

            // Look backward and forward from the middle of the word to find a place to hyphenate.
            for (i = 0; wordMiddle - i > wordStart + 2; ++i) {
                // Two consonants (ie., "ts") as the place to hyphenate.
                if (wordMiddle + i + 1 < textIndex && consonants.indexOf(text[wordMiddle + i]) > -1 && consonants.indexOf(text[wordMiddle + i + 1]) > -1) {
                    textIndex = wordMiddle + i + 1;
                    returnString = text.substring(wordStart, textIndex - wordStart) + '-';
                    return returnString;
                }

                if (consonants.indexOf(text[wordMiddle - i]) > -1 && consonants.indexOf(text[wordMiddle - i - 1]) > -1) {
                    textIndex = wordMiddle - i;
                    returnString = text.substring(wordStart, textIndex - wordStart) + '-';
                    return returnString;
                }
            }

            // No place found to hyphenate, so just split the word in half.
            textIndex = wordMiddle;
            returnString = text.substring(wordStart, textIndex - wordStart) + '-';
            return returnString;
        };

        // Adds spaces to the beginning of the word to align the letter highlight, and a span element
        // to color the highlighted character.
        //
        // For example, 'reading' becomes '&nbsp;&nbsp;&nbsp;&nbsp;re<span class="highlight">a</span>ding'
        //
        // Param: word. The word to process.
        // Returns the padded and highlighted word. The return value of this function is set to the
        // innerHTML of the outputTextElement.

        let padAndHighlightWord = function(word, isEnd) {
            let i;
            // Find the highlighted character.
            let data = getHighlightIndex(word);
            word = data.word;
            let highlightIndex = data.highlightIndex;
            let centerWorldLength = data.arrayIndex;

            if (highlightIndex >= 0) {
                const spiltWorlds = word.split(' ');
                let highlightChar = '';
                let rightString = '';
                let leftString = '';

                if (isAudio) {
                    leftString = word.substring(0, highlightIndex);
                    highlightChar = (word === '') ? '' : word.substring(highlightIndex, highlightIndex + centerWorldLength);
                    rightString = word.substring(highlightIndex + centerWorldLength);

                    // highlightChar = (word === '') ? '' : word.substring(highlightIndex < 0 ? 0 : highlightIndex, spiltWorlds[arrayIndex + highlightIndex < 0 ? highlightIndex : 0].length);
                    // rightString = (highlightIndex < word.length - 1) ? word.substring(highlightIndex + spiltWorlds[arrayIndex + highlightIndex < 0 ? highlightIndex : 0].length, word.length - highlightIndex - 1) : '';
                } else {
                    highlightChar = (word === '') ? '' : word[highlightIndex];
                    rightString = (highlightIndex < word.length - 1) ? word.substring(highlightIndex + 1, word.length - highlightIndex - 1) : '';
                }


                // Add spaces to the beginning of the word to put the highlight in the correct place
                let padding = '';
                let isRight = false;
                let isLeft = false;

                if (spiltWorlds[0].length >= highlightIndex) {
                    if (spiltWorlds[0].length === highlightIndex + 1) {
                        isRight = true;
                    }
                } else {
                    if (spiltWorlds[0].length + 1 === highlightIndex) {
                        isLeft = true;
                    }
                }

                // for (i = 0; i < max_padding - highlightIndex; ++i) {
                // padding = "&nbsp;" + padding;
                // }

                if (isAudio) {
                    isRight = true;
                    isLeft = true;
                }

                let highlightedWord = '';
                // Put the character to highlight into a span.
                if (isLeft) {
                    highlightedWord = `<span class="leftString  left">${leftString}</span>`;
                } else {
                    highlightedWord = `<span class="leftString">${leftString}</span>`;
                }

                highlightedWord = `${highlightedWord}<span class="highlight">${highlightChar}</span>`;

                if (!isEnd) {
                    if (isRight) {
                        highlightedWord = `${highlightedWord}<span class="rightString right">${padding}${rightString}</span>`;
                    } else {
                        highlightedWord = `${highlightedWord}<span class="rightString">${rightString}</span>`;
                    }
                } else {
                    highlightedWord = `${highlightedWord}<span class="rightString"></span>`;
                }


                return highlightedWord;
            } else {
                //console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
            }
        };

        // Finds the index of the letter to highlight.
        // Calculates based on letter value (vowels are higher than consonants) times the curve
        // for that word length (favors the location 1/3 of the way into the word).
        // This is intended to return the best focus point for the word.
        //
        // Param: word. The word upon which to determine the highlight index.
        // Returns the index of the letter to highlight.
        //
        // Letters, and their corresponding value scores, to use when choosing which letter will be the highlight
        // letter within a word. Typically, vowels score a 5, and consonants are a 3. The letter's value is
        // multiplied by its position value within a word (highlightCurveValue[word.length][letterPosition]), and
        // the letter with the highest score becomes the highlighted letter. For example, for a four-letter word,
        // the highlightCurveValue is "4973". Using the word "from", f=3*4=12, r=3*9=27 o=5*7=35 m=3*3=9, the
        // letter "o" has the highest score of 35 and becomes the highlighted letter.

        let getHighlightIndex = function(word) {
            if (!isAudio) {
                let maxScore = -1;
                let maxScoreLocation = -1;
                let score;
                let i;

                for (i = 0; i < word.length; ++i) {
                    // Find the letter in the list of letters.
                    score = getScore(word[i], i, word.length);

                    if (score > -1) {
                        // If this is the highest score, record this as the word to highlight.
                        if (score > maxScore) {
                            maxScore = score;
                            maxScoreLocation = i;
                        }
                    }
                }

                // If a score was found, return the location of the best letter to hightlight for the
                // optimal recognition point.
                if (maxScore > -1) {
                    return {
                        word: word,
                        highlightIndex: maxScoreLocation,
                        arrayIndex: null
                    };
                }

                // Could not find a letter to score (ie., this is a collection of symbols).
                // Highlight the character at the 1/3 position in the word.

                return {
                    word: word,
                    highlightIndex: Math.max(0, Math.floor(word.length / 3 - 1)),
                    arrayIndex: null
                };
            } else {
                let result = 0;
                let index = 0;
                let splitWorld = word.split(' ');
                const emptyLength = limit - (parseInt(splitWorld.length, 10)) + 1;

                // //console.log('sssssss isLastWords ssssssssss', isLastWords, isLastChar)

                // //console.log('splitWorld', splitWorld)

                if(isLastWords) {
                    for (let i = 0; i < emptyLength; ++i) {
                        splitWorld.unshift('0');
                    }
                }

                if (!isNextFull) {
                    for (let i = 0; i < emptyLength; ++i) {
                        splitWorld.push('0');
                    }
                }

                if (splitWorld.length % 2 === 0) {
                    index = splitWorld.length / 2;
                } else {
                    index = (splitWorld.length - 1) / 2;
                }

                let highlightIndex = splitWorld.reduce((accumulator, currentValue, iterator) => {
                    if (iterator < index) {
                        // //console.log('iterator: ', iterator, 'index: ', index, currentValue.toString().length);
                        return accumulator + parseInt(currentValue.toString().length + 1, 10);
                    }
                    return accumulator;
                }, 0);

                return {
                    word: splitWorld.join(' '),
                    highlightIndex: highlightIndex,
                    arrayIndex: splitWorld[index].length
                };
            }
        };

        // Gets the highlight score for the given letter at the given location.
        // Param: letter. The letter to evaluate. Ie., the "a" in "reading".
        // Param: index. The index of the letter in the word. Ie., 2.
        // Param: wordLength. Ie., 7.
        // Returns the score of the given letter in its location within the word.

        let getScore = function(letter, index, wordLength) {
            // Find the letter in the list of letters.
            let letterIndex = highlightLetters.indexOf(letter.toLowerCase());
            if (letterIndex > -1) {
                // Get the letter's value (vowels are higher than consonants).
                let letterValue = parseInt(highlightLetterValue[letterIndex], 10);

                // //console.log('33333333333333333333', {
                //     highlightCurveValue: highlightCurveValue,
                //     wordLength: wordLength,
                //     index: index
                // })
                // Get the value for this position within the word.
                let curveValue = parseInt(highlightCurveValue[wordLength][index], 10);

                // Calculate the score for this letter in this location.
                let score = letterValue * curveValue;

                // //console.log('========== score ==========', score)
                // Return the letter's score
                return score;
            }

            // A score could not be found. Return -1.
            return -1;
        };

        // Combines the Start and Stop button actions into a single button.
        let startStopReader = function() {

            // inputTextArea.focus();

            // Because the IsPlaying flag gets set later, false means it's about to start playing
            if (isPlaying) {
                stopReader();
            } else {
                startReader();
            }
        };

        // Starts the reader program on the text in the inputText textarea.

        let startReader = function() {
            // Put the focus on the text area.

            if (isFocus) {
                // inputTextArea.focus();
            }


            // Stop the reader if it is paused.
            stopReader();

            text = readableStream.value;
            multiWordDisplay = multiWordCheckBox.checked;

            // To increase the amount of time a long word is displayed, increase the value of timerDelaySlope.
            //
            // For example:
            // timerDelaySlope 0.00: 1 char word is 1.0, 15 char word is 1.0
            //                 0.05:                0.8,                 1.5
            //                 0.10:                0.6,                 2.0
            //                 0.15:                0.4,                 2.5
            //                 0.20:                0.2,                 3.0

            timerDelay = Math.floor(60000 / speedInputElement.value);
            timerDelaySlope = multiWordDisplay ? timerDelaySlopeMulti : timerDelaySlopeSingle;
            timerDelayOffset = timerDelaySlope * (-5) + 1;

            // Set the values to start playing the reader.
            isPlaying = true;
            hideControls();
            startStopButton.value = stopString;
            inputTextArea.setAttribute('contenteditable', false)
            // inputTextArea.readOnly = true;
            inputTextArea.className = 'UIInputReadOnly';
            speedInputElement.readOnly = false;
            speedInputElement.className = 'UIInputReadOnly';
            wordCount = 0;
            timeSpentPaused = 0;
            timeStartReading = new Date().getTime();
            wpmDisplay.innerHTML = 'Calculating ...';

            // Immediately display the first word.
            wordUpdateTimer = setTimeout(function() {
                updateWord();
            }, 0);
        };


        // Stops the reader.

        let stopReader = function() {
            // if (isFocus) {
            //     inputTextArea.focus();
            // }

            // const left = inputTextArea.value.substring(0, start);
            // const center = inputTextArea.value.substring(start - 1, end);
            // const right = inputTextArea.value.substring(end);

            inputTextArea.innerHTML = readableStream.value
            // inputTextArea.insertAdjacentHTML('afterbegin',`${left}<span class="active">${center}</span>${right}`)

            // inputTextArea.setSelectionRange(0, 0);

            setStopState('stopReader');

            // Clear the displayed word.
            outputTextElement.innerHTML = '';
        };

        // Sets the values to a stopped state, but does not blank out the current word on the display.

        let setStopState = function(type = undefined) {
            if (wordUpdateTimer) {
                clearTimeout(wordUpdateTimer);
            }

            // Set the playing and pausing flags.
            isPlaying = false;
            isPaused = false;

            // Unhide all the controls.
            setVisibilityCheckboxes();
            showControls();

            // Set the textarea and the words per minute textbox to read-only.
            // inputTextArea.readOnly = false;
            inputTextArea.setAttribute('contenteditable', true)
            inputTextArea.className = 'UIInput';
            speedInputElement.readOnly = false;
            speedInputElement.className = 'UIInput';

            // Set the values to the beginning of the text.
            countData = 0;
            isNextSamle = 0;
            indexSamle = 1;
            nextSamle = {
                start: 0
            };
            leftLimit = '';
            limit = structuredClone(defaultData.limit);
            count2Limit = -1;
            isLastWords = false;
            count = 0;
            isCountFull = false;
            isNextFull = false;
            textIndex = 0;
            isSecondStep = true;
            indexWords = -1;
            isLastChar = false

            updateProgressBar(0, 100);

           if(type === 'stopReader') {
               document.dispatchEvent(new CustomEvent(`stop-frame`, {
                   detail: {
                       id: self.dataset.id,
                       type: 'stop-frame'
                   }
               }));
           }
            // Set the text of the buttons to the stopped state.
            pauseResumeButton.value = pauseString;
            startStopButton.value = startString;
        };

        // Pause/Resume button.

        let pauseResumeReader = function() {
            // Pause only happens if the reader is playing.
            if (isPlaying) {

                // if (isFocus) {
                //     inputTextArea.focus();
                // }

                if (isPaused) {
                    // Resume playing the reader.
                    pauseResumeButton.value = pauseString;
                    isPaused = false;
                    hideControls();
                    multiWordDisplay = multiWordCheckBox.checked;
                    timerDelaySlope = multiWordDisplay ? timerDelaySlopeMulti : timerDelaySlopeSingle;
                    timeSpentPaused += new Date().getTime() - timeStartPause;

                    // Immediately display the next word.
                    wordUpdateTimer = setTimeout(function() {
                        updateWord();
                    }, 0);
                } else {
                    // Pause the reader.
                    clearTimeout(wordUpdateTimer);
                    timeStartPause = new Date().getTime();
                    isPaused = true;
                    pauseResumeButton.value = resumeString;
                    showControls();
                    selectWordInTextArea(wordStart, textIndex);
                }
            }
        };

        // Shows the text area and control buttons.

        let showControls = function() {
            // Set the flags.
            isTextAreaHidden = false;
            areButtonsHidden = false;

            // Change the visibility of the controls.
            // inputTextAreaDiv.style.visibility = 'visible';
            // controlButtons.style.visibility = 'visible';
        };

        // Hides the text area and control buttons according to the users settings.

        let hideControls = function() {
            // Set the flags.
            isTextAreaHidden = hideTextAreaCheckBox.checked;
            areButtonsHidden = (isTextAreaHidden) ? hideButtonsCheckBox.checked : false;

            // Change the visibility of the controls.
            if (isPlaying && !isPaused) {
                // inputTextAreaDiv.style.visibility = (isTextAreaHidden) ? 'hidden' : 'visible';
                // controlButtons.style.visibility = (areButtonsHidden) ? 'hidden' : 'visible';
            }
        };

        // Faster button. Increases the words per minute by 5% in multiples of 5.

        let fasterReader = function() {
            let speed = parseInt(speedInputElement.value, 10);
            speed = Math.floor(speed / 5);
            speed = Math.max(speed + 1, Math.floor(1.05 * speed));
            speed = speed * 5;
            speed = (speed > max_speed) ? max_speed : speed;
            speedInputElement.value = speed;
            timerDelay = Math.floor(60000 / speed);

            // If the reader is paused, reselect the word in the text area.
            if (isPaused) {
                // if (isFocus) {
                //     inputTextArea.focus();
                // }
                
                // selectWordInTextArea(wordStart, textIndex);
            }
        };


        // Slower button. Decreases the word per minute by just over 5% in multiples of 5.

        let slowerReader = function() {
            let speed = parseInt(speedInputElement.value, 10);
            speed = Math.floor(speed / 5);
            speed = Math.floor(0.953 * speed);
            speed = speed * 5;
            speed = (speed < min_speed) ? min_speed : speed;
            speedInputElement.value = speed;
            timerDelay = Math.floor(60000 / speed);

            // If the reader is paused, reselect the word in the text area.
            if (isPaused) {
                // if (isFocus) {
                //     inputTextArea.focus();
                // }

                
                selectWordInTextArea(wordStart, textIndex);
            }
        };

        // Go Back button. Searches backwards one second, then searches to find the beginning of the previous sentence.

        let goBackReader = function() {
            if (isPlaying || !isPaused) {
                //console.log('------------ goBackReader ------------');
                // Go back approximately one second, then search for the start of that sentence.
                let wordsPerSecond = 1000 / timerDelay;
                let goBackLength = Math.floor(wordsPerSecond * 6); // Words per second, times an estimate of 6 characters per word.
                let index = Math.max(0, textIndex - goBackLength);

                // Find the beginning of this sentence, or 1000 characters, whichever comes first.
                let searchForSentenceStart = 1000;
                while (index > 0 && searchForSentenceStart-- > 0 && sentenceEnders.indexOf(text[index]) === -1) {
                    --index;
                }

                if (index > 0) {
                    // Find the next white space character.
                    while (index < text.length && wordBreakChars.indexOf(text[index]) === -1) {
                        ++index;
                    }
                }

                // Set textIndex to the new location.
                textIndex = (index === 0) ? 0 : index + 1;

                // If currently paused, display the word.
                if (isPaused) {
                    // Get the next word.
                    word = nextWord();

                    // Display the word.

                    displayWord(word);
                }
            }
        };

        // Go Forward button. Skips ahead 5 seconds, then searches for the start of the next paragraph.

        let goForwardReader = function() {
            if (isPlaying || !isPaused) {
                //console.log('------------ goForwardReader ------------');
                // Go forward approximately 5 seconds.
                let wordsPerSecond = 1000 / timerDelay;
                let goForwardLength = Math.floor(wordsPerSecond * 6 * 5); // Words per second, times an estimate of 6 characters per word, times 5.
                let index = Math.min(text.length, textIndex + goForwardLength);

                // Find the end of this paragraph.
                let searchForParagraphEnd = 2000;
                while (index < text.length && searchForParagraphEnd-- > 0 && paragraphEnders.indexOf(text[index]) === -1) {
                    ++index;
                }

                // If the paragraph end was not found, find the end of this sentence.
                if (searchForParagraphEnd <= 0) {
                    // Find the end of this sentence.
                    let searchForSentenceEnd = 1000;
                    while (index < text.length && searchForSentenceEnd-- > 0 && sentenceEnders.indexOf(text[index]) === -1) {
                        ++index;
                    }

                    // Find the next white space character.
                    while (index < text.length && searchForSentenceEnd-- > 0 && wordBreakChars.indexOf(text[index]) === -1) {
                        ++index;
                    }
                }

                // Set textIndex to the new location.
                //console.log('----------------------------', index, text.length);
                if (index >= text.length) {
                    stopReader();
                } else {
                    textIndex = index;
                }

                // If currently paused, display the word.
                if (isPaused) {
                    // Get the next word.
                    let word = nextWord();

                    // Display the word.

                    displayWord(word);
                }
            }
        };

        // Handles the check and uncheck events for the Hide text area checkbox.

        let hideTextAreaOnChange = function(event) {
            setVisibilityCheckboxes();
            hideControls();
        };

        // Disables and enables the "Also hide buttons" checkbox and label text.

        let setVisibilityCheckboxes = function() {
            // Check if the hide text area checkbox is checked.
            if (hideTextAreaCheckBox.checked) {
                // If it is, enable the buttons checkbox and text.
                hideButtonsCheckBox.disabled = false;
                alsoTextSpan.className = 'UIText';
            } else {
                // Otherwise, disable the buttons checkbox and text.
                hideButtonsCheckBox.disabled = true;
                alsoTextSpan.className = 'UIDisabledText';
            }
        };

        // Handles the check and uncheck events for the multi word checkbox.

        let multiWordCheckBoxOnChange = function(event) {
            multiWordDisplay = multiWordCheckBox.checked;
        };


        // Suppresses specific keyboard input in the textarea and speed input elements while paused.
        // Allows keys to be used while maintaining the selection in the text area.

        let keypressInput = function(event) {
            console.log('########## keypressInput ##############', event.keyCode)
            if (isPlaying) {
                if (document.activeElement === inputTextArea || document.activeElement === speedInputElement) {
                    if (event.keyCode === 27 || event.keyCode === 32 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
                        // NOTE: If I want to support IE before 9, I have to do things a bit differently, but this is supposed to work everywhere else.
                        //       Details: http://stackoverflow.com/questions/5963669/whats-the-difference-between-event-stoppropagation-and-event-preventdefault
                        event.preventDefault();
                        event.stopPropagation();
                        event.cancelBubble = true;
                        return false;
                    }
                }
            }
        };

        // Suppresses specific keyboard input in the textarea and speed input elements while paused.
        // Allows keys to be used while maintaining the selection in the text area.

        let keydownInput = function(event) {
            // Take keyboard input only when the focus is on the body.
            console.log('########## keydownInput ##############', event.currentTarget.tagName)
            if(event.currentTarget.tagName  === 'DIV') {
                // let read = event.currentTarget.parentNode.querySelector('.readable-stream')
                // event.currentTarget.value = event.currentTarget.value.trim()
                readableStream.value = event.currentTarget.textContent
                // readableStream.textContent = event.currentTarget.value.trim()

                console.log('event.currentTarget.textContent', event.currentTarget.parentNode.querySelector('.readable-stream'))
                if (isPlaying) {
                    // Take the focus away from wherever it is. This puts the focus on document.body.
                    document.activeElement.blur();

                    switch (event.keyCode) {
                        case 27:
                            stopReader();
                            break;

                        case 32: // Spacebar.
                            if (textIndex !== 0) {
                                pauseResumeReader();
                            } else {
                                startReader();
                            }
                            break;

                        case 37: // Left Arrow.
                            goBackReader();
                            break;

                        case 38: // Up Arrow.
                            fasterReader();
                            break;

                        case 39: // Right Arrow.
                            goForwardReader();
                            break;

                        case 40: // Down Arrow.
                            slowerReader();
                            break;
                    }

                    // Prevent these keys from affecting the display.
                    if (event.keyCode === 27 || event.keyCode === 32 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
                        event.preventDefault();
                        event.stopPropagation();
                        event.cancelBubble = true;
                        return false;
                    }
                }
            } else {
                console.error(' Надо поставить обработчик')
                
            }

        };

        resolve({
            // Declare public members.
            setStopState: setStopState,
            keydownInput: keydownInput,
            keypressInput: keypressInput,
            startStopReader: startStopReader,
            pauseResumeReader: pauseResumeReader,
            goBackReader: goBackReader,
            goForwardReader: goForwardReader,
            slowerReader: slowerReader,
            fasterReader: fasterReader,

            highlightCurveValue: highlightCurveValue,
            highlightLetters: highlightLetters,
            highlightLetterValue: highlightLetterValue,
            nextWord: nextWord,
            startReader: startReader,
            getScore: getScore,
            padAndHighlightWord: padAndHighlightWord,
            consonants: consonants,
            startStopButton: startStopButton,
            pauseResumeButton: pauseResumeButton,
            goBackButton: goBackButton,
            goForwardButton: goForwardButton,
            slowerButton: slowerButton,
            fasterButton: fasterButton,
            hideTextAreaCheckBox: hideTextAreaCheckBox,
            hideTextAreaOnChange: hideTextAreaOnChange,
            multiWordCheckBox: multiWordCheckBox,
            multiWordCheckBoxOnChange: multiWordCheckBoxOnChange,
            consonantLowValue: consonantLowValue,
            consonantHighValue: consonantHighValue,
            isInFirefox: isInFirefox,
            inputTextArea: inputTextArea,
            readableStream: readableStream
        });
    });
};