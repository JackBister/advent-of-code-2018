

function day2(input: string) {
    let strings = input.split('\n');

    let num2s = 0;
    let num3s = 0;
    strings.forEach((s) => {
        let seenChars = new Map<string, number>();
        for (let i = 0; i < s.length; ++i) {
            let c = s.charAt(i);
            if (!seenChars.has(c)) {
                seenChars.set(c, 1);
            } else {
                seenChars.set(c, seenChars.get(c).valueOf() + 1);
            }
        }
        let hasIncremented2s = false;
        let hasIncremented3s = false;
        for (let kv of seenChars.entries()) {
            if (kv[1] === 2 && !hasIncremented2s) {
                num2s++;
                hasIncremented2s = true;
            } else if (kv[1] === 3 && !hasIncremented3s) {
                num3s++;
                hasIncremented3s = true;
            }
        }
    });

    return num2s * num3s;
}

function part2(input: string) {
    let strings = input.split('\n');

    let seen = new Map<string, string[]>();

    strings.forEach((s) => {
        for (let i = 0; i < s.length; ++i) {
            let prefix = s.slice(0, i);
            let suffix = s.slice(i + 1, s.length);

            if (seen.has(prefix)) {
                let suffixes = seen.get(prefix);
                if (suffixes.indexOf(suffix) !== -1) {
                    console.log(prefix + suffix);
                } else {
                    suffixes.push(suffix);
                }
            } else {
                seen.set(prefix, [suffix]);
            }
        }
    });
}

part2(`mphcuiszrnjzxwkbgdzqeoyxfa
mihcuisgrnjzxwkbgdtqeoylia
mphauisvrnjgxwkbgdtqeiylfa
mphcuisnrnjzxwkbgdgqeoylua
mphcuisurnjzxwkbgdtqeoilfi
mkhcuisvrnjzowkbgdteeoylfa
mphcoicvrnjzxwksgdtqeoylfa
mxhcuisvrndzxwkbgdtqeeylfa
dphcuisijnjzxwkbgdtqeoylfa
mihvuisvrqjzxwkbgdtqeoylfa
mphcuisrrnvzxwkbgdtqeodlfa
mphtuisdrnjzxskbgdtqeoylfa
mphcutmvsnjzxwkbgdtqeoylfa
mphcunsvrnjzswkggdtqeoylfa
mphcuisvrwjzxwkbpdtqeoylfr
mphcujsdrnjzxwkbgdtqeovlfa
mpfcuisvrdjzxwkbgdtteoylfa
mppcuisvrpjzxwkbgdtqeoywfa
mphcuisvrnjzxwkbfptqroylfa
mphcuisvrnjzxwkbgstoeoysfa
mphcufsvrnjzcwkbgdeqeoylfa
mphcuissrnjzxwkbgdkquoylfa
sphcuxsvrnjzxwkbgdtqioylfa
mphcuiivrhjzxwkbgdtqevylfa
echcuisvrnjzxwkbgltqeoylfa
mphcuisvrljexwkbvdtqeoylfa
mpjcuisvrnjzxwkhidtqeoylfa
mphcuisvrfjzmwkbgdtqeoylfl
mwhcuisvrnjzxwkbgdtqeoytfm
mphcuisvrsjzxwkbgdaqeoylfh
mohcuisvrnjzxwkbgdtqtoymfa
maycuisvrnjzxwkbgdtqboylfa
pphcuisvqnjzxwkbgdtqeoylfd
mprcuisvrnjtxwmbgdtqeoylfa
mfhcuisgrnjzxckbgdtqeoylfa
mphiubsvrnjzxwkbgdtqeoyufa
dphctisvrnjzxwkbgdtqeoylfk
mphcuisvrnjznwksgdtqeoyzfa
mpwcuisvrnjziwkbgdtqaoylfa
mphduzsvrnjznwkbgdtqeoylfa
mphccisvrnjzxwebgdtqeoylqa
xphcuisvrnjzxwkfvdtqeoylfa
mphcupsvrnjzxwkbgdtfeoylpa
mphcuisvrtjzjwkbgdtqeoylfe
mpbcuisvrnjzxwkbgdmieoylfa
mphcuisvrnjzxwkbgjtqetylaa
mphcuisvrnjzxwpbgdtgdoylfa
ophcufsvrqjzxwkbgdtqeoylfa
iphcuhsvrnjzxwkbgetqeoylfa
mphcuisvunjzxwwbgdtqeoylqa
mphcpisvrnjzowkbgdtveoylfa
mphcuisvrnjzxhkbgdtqeotlla
mphcuisvrnjzxwkbodtgeoylha
mphcuisvrjjzxwkbwdtqtoylfa
mphcwisvrnjnxwkbgjtqeoylfa
mplcuicqrnjzxwkbgdtqeoylfa
mphcuisvrnjzxydbgdtqeoylfn
ophckisvrnjzxwkbgdtqeozlfa
mphcuisvrkjzxwkbgdtteoblfa
yphcuisvrnjcxwkbggtqeoylfa
mphcuisvrnazxwfbqdtqeoylfa
mphcuisvrmjzxwkbgdtlwoylfa
mphctksvrnjzxwibgdtqeoylfa
mphcuisprnjzxlebgdtqeoylfa
mphcuisnrnjzxakbgdtueoylfa
mphcuiavrnjoxwtbgdtqeoylfa
nphcuisvrnjzxwkbgdtqzoylfk
mphcuisrrnjmxwkbgdtqdoylfa
mphcuisvrujzxwkvgdtqehylfa
mphcuisvrnfzxwkogdtqebylfa
mphcuisvrnjwdwkbgdtqeoyxfa
mphcuisvrntzxwkrgxtqeoylfa
mpzcuisvrnjzxwebgdtqeoylsa
aphcuikvrnjzxwwbgdtqeoylfa
mphcqisvrnjzxwkpgdtqeoelfa
mphcuusvrnjzxwkbgdtjeodlfa
mphcuisvrnjzewkbgdtteoylza
mphcuisvanjzxwkbgdtheoylfc
mphcjishrnjzxwkbgltqeoylfa
mpxcuislrnjzxwkbgdtqeoynfa
mphcuisvrnjjxwkbgdtmeoxlfa
mphcimsvrnjzxwkbsdtqeoylfa
mphcxisvcnjzxwjbgdtqeoylfa
mphcuisbrvjzxwkbgdtqeoymfa
mplcuisvrnjzxwkbgdtaenylfa
mphcuihvrnjzxwkygytqeoylfa
mphcbisvrnjzxhkbgdtqezylfa
mphcuisarnjzxwkbgatqeoylfv
mphcumsvrnjzxwkbgdrqebylfa
mlhcuisvrnwzxwkbgdtqeoylfx
mpkcuisvrkjzxwkbgdtqeoylfo
mphcuissrnjzxwkbgdtqmoylfc
mphcuiwvrnjuxwkfgdtqeoylfa
mphcuicvlnjzxwkbgdvqeoylfa
mphcuisvrvvzxwkbfdtqeoylfa
myhcuisvrnjpxwkbgntqeoylfa
mpocuisvrnjzxwtbgitqeoylfa
mphcuisvrnjzxwkbgdtwewyqfa
mphcuisvtnjzxwwbgdtqeoolfa
mphcuisvrnjzxgkbgdyqeoyyfa
mphcuisvrdjzxwkbgpyqeoylfa
bphcuisvrnjzxwkbgxtqefylfa
sphcuisvrdjzxwktgdtqeoylfa
mphcuvsvrnjmxwobgdtqeoylfa
mphcuisvrnjzxwkbsdtqeuylfb
mnhcmisvynjzxwkbgdtqeoylfa
mphckisvrnjzxwkhgdkqeoylfa
mpacuisvrnjzxwkbgdtqeoolaa
mpgcuisvrnjzxwkbzdtqeoynfa
mphcuisvrojzxwkbzdtqeoylga
mphcuisvknjfxwkbydtqeoylfa
mphcuistrnjzxwkbgdqqeuylfa
bpvcuiszrnjzxwkbgdtqeoylfa
mphcuxsvrnjzswkbgdtqeoelfa
mphcuisvbnjzxwlbgdtqeoylla
mphcuisvonczxwkbgktqeoylfa
mphcuisvrnkzxwvbgdtquoylfa
mphcuisvrnjzxokfgdtqeoylia
tphcuisvrnjzxwkbjdwqeoylfa
mihcuisvrnjzpwibgdtqeoylfa
mphcuisvrejzxwkbgdtqjuylfa
mprcuisvrnjixwkxgdtqeoylfa
mpqcuiszrnjzxwkbgdtqeodlfa
mphcuasvrnjzzakbgdtqeoylva
mphcuisvrnjzmwkbtdtqeoycfa
mphcuisvrnjzxwkbcdtqioylxa
mphckisvrnjzxwkbcdtqeoylfm
mphcuisvrnjuxwbogdtqeoylfa
mphcuisdrnjzxwkbldtqeoylfx
mphcuisvrnjoxwkbgdtqeyyyfa
mphcuicvqnjzxwkbgdtqeoylna
mpmcuisvrnjzxwkbgdtqktylfa
mphcuisvrnqzxwkggdtqeoykfa
mphcuisvryjzxwkbydtqejylfa
mphcugsvrnjzxwkbghtqeeylfa
rphcuusvrnjzxwkwgdtqeoylfa
zphwuiyvrnjzxwkbgdtqeoylfa
cphcuivvrnjzxwkbgdtqenylfa
mphcuisvrnjzxwkagotqevylfa
mprcuisvrcjzxwkbgdtqeoytfa
mphjugsvrnezxwkbgdtqeoylfa
mphcuisvryjzxwkbgltqeoylaa
mphcursvrnjzxfkbgdtqeoydfa
mphcuisvrcuzxwkbgdtqeoylfw
mphcuisvrijzxwkbgdtqeoelfh
xphcuisvenjzxjkbgdtqeoylfa
mphcuisvrnazxwkbgdeqeoylaa
mphcuisbrsjzxwkbgdtqeoygfa
mlhvuisvrnjzxwkbgdtqeoylfh
mphcuisvrnjzxukbgdtqeoyhfy
mpzcuilvrnjzawkbgdtqeoylfa
hphcuisjfnjzxwkbgdtqeoylfa
mahcuisvrnjzxwkegdtqeoylfi
mphcuixvrnjzcwkbgdtqetylfa
mphcuisvrnjzxwkdgdtqeoklfj
mlhcuisvrnjzxwkbgdteeoylka
mphcuifvrnjbxwkrgdtqeoylfa
mphcuasvrnjzzwkbgdtqeoylva
mphcuisvrnjzxwkboutqeoylba
mbhcuisvcnjzxwklgdtqeoylfa
mpbcuisvrnjzxgkbgdtqesylfa
mphcuisvrnjfswkbgdtqeoylfd
mphcuisvrnjzxwkbgdoweoysfa
uphcuisvrnjzrwkbgdtqelylfa
mphcuisvrnjzxwkbgdtqyoylsi
mpqcuiqvxnjzxwkbgdtqeoylfa
mphcuisorfjzxwkbgatqeoylfa
mphcuisvrntfxwkbzdtqeoylfa
mphcuisvrnrzxwkbgdtueoylfl
mphcuisvrnjzewkagdtyeoylfa
mpocuisdrnjzxwkbgdtqeozlfa
mphcuisvrnjjxwkbgdtoeoylfm
mphcuisvenjzxwkbgdtqwoylza
mpmcuisvrnjzxwkbgdtqeoxlfr
mphcuisvgnjhxwkbgdtqeoplfa
mphcuisvrnjzowkdgdtqeoyyfa
mphcuisqynjzxwkbgdtqeoylda
hphcuisvgnjzxwkbgdtbeoylfa
iphcuipvrnuzxwkbgdtqeoylfa
mphcuisvrnjzsikbpdtqeoylfa
mpwcuhsvrnjzxbkbgdtqeoylfa
mnhjuisvcnjzxwkbgdtqeoylfa
mphcudsvrnjzxwkbgdtqloilfa
mpncuiwvrwjzxwkbgdtqeoylfa
mphcuisvrnjgawkbgdtqeoylya
mphcuisvrnjzxwkbggtteoslfa
mphcuisvrnjzxwkbgdvqeoylpe
mphcuisvrnczxfkbgktqeoylfa
mphcuifvrnjzxwkbgdbmeoylfa
mphcuisvrnjytwkbgdtqeoylla
mphcuisvrnjzxwkbgdtjeoxlfn
mphjuisvrnjzxwkbghtqeoyffa
mphcuisvrnjzxkrbgdtqeoylaa
mphcbisvrnjzxwkbgttqeoylfs
mphkuksvbnjzxwkbgdtqeoylfa
nphcuidvrnjzxwhbgdtqeoylfa
mphguzsvrnjzxwkbgdaqeoylfa
mihcuisfrnjzxwkbgdtqhoylfa
mphcuisvrnrzxwpbgdtqesylfa
zphcuisvrnjzxwkbddtqeoylaa
mphcuigvmnjzxwkbgdtqeoylba
mjhcuisvrnjzxjkbgdtqeoylha
mphnuisvrnjznwkbgdtqnoylfa
mkhcuisvrnjcxwkbgdqqeoylfa
mphcuisvenjzxwbbqdtqeoylfa
qphcuisnrnjzawkbgdtqeoylfa
mphcuisvrdjzxwkbgdtqeoywca
mphcuzsvvnjzxwfbgdtqeoylfa
pphcuxsvrnjzxwkbgdtmeoylfa
mphiuvsvrnjzxlkbgdtqeoylfa
mphlqisvrnjzxkkbgdtqeoylfa
mmhcuisvrnjzxwkbgatqeoylea
mphduisrrnjoxwkbgdtqeoylfa
mphcuisvrnjnxwkvgdyqeoylfa
mphcuvsvrnjzxgkbgdtqeoylfz
mphcuisvryjzxwkbggtqkoylfa
iphcuisvrdjzxwkbgotqeoylfa
mphcuisvrnjzxwhbgdtqwoyofa
mphcorbvrnjzxwkbgdtqeoylfa
mghcuisvrnpzxykbgdtqeoylfa
mphauisvrnjnxwkbzdtqeoylfa
mphcgisvrnjzxwkwgdtqeoygfa
mphcuisvrnjzxwkggotqeoylba
mphcuesvrnjzxwkbgdwqebylfa
yphcuisvrnjzxwkbgdxqeoylja
ephyuisvrnjzywkbgdtqeoylfa
mfhcuisqrnjzxwkbgdlqeoylfa
mphkuisvrnjzxwkbertqeoylfa
mphcuusgrnjzxwkbggtqeoylfa
mphcuildrnjvxwkbgdtqeoylfa
mphcuiuvrnjzlwkbgwtqeoylfa
mppcuisvrljzxwkbgdtqeoylfw
mphcwiwvrnjzxwsbgdtqeoylfa
mphcubivrnjzxwkqgdtqeoylfa
mphcuisvrnjpxwkngdtqeoylpa
pchcuisvrgjzxwkbgdtqeoylfa
mphcuisvlnjzxwkbgdtmeoylfw
mphcuisvrnjzywkbgdvqeoylfj
mpzcuisvrnezxwktgdtqeoylfa
mphcuisvrnjbxwkbgzrqeoylfa
mphcuisvrnjzxwktgdtqeodtfa
jphcuiavrnjzxwkbgdtqeoylfv
mphcuisvrnjzxwkbddppeoylfa
mphcuissrkjzxwkbgxtqeoylfa
mphcuisvrhjzxwxbgdtqeoylxa
mphcvisvgnjjxwkbgdtqeoylfa
mphcuisprnjwxwtbgdtqeoylfa
mphcuissrnjzxqkbgdtqeoymfa
mphcuiabrnjzxokbgdtqeoylfa
mphcuisvrnczxwkbgmtpeoylfa`);
