const pageEvaluate = async (page) => {
    return await page.evaluate(() => {
        let info = {}
        //no logic here storage
        try {
            let storage = document.getElementById("drug_header")
            info.storage = (storage ? storage.innerText : []).split("\n");
        }
        catch (err) {
            info.storage = [];
        }


        //no logic here overview
        try {
            let overviewHeading = Array.from(document.getElementById("overview").getElementsByClassName('DrugOverview__title___1OwgG'))
            let overview = Array.from(document.getElementById("overview").getElementsByClassName('DrugOverview__content___22ZBX'))

            let Jsonoverview = overview.map((element, index) => {
                let overviewJSON = {}
                if (overviewHeading[index]) {
                    overviewJSON.heading = overviewHeading[index].innerText
                }
                overviewJSON.list = element.innerText.split("\n").filter(function (e) { return e });
                return overviewJSON
            })
            info.overview = (Jsonoverview ? Jsonoverview : "");

        }
        catch (err) {
            info.overview = [];
        }

        //logic here
        try {
            let Substitute = Array.from(document.querySelectorAll('.SubstituteItem__item___1wbMv'))
            let links = Substitute.map(element => {
                let subs = {}
                subs.name = element.innerText.split("\n")[0];
                let anchor = element.getElementsByTagName('a')[0];
                if (anchor) {
                    subs.link = anchor.href.replace("https://www.1mg.com/drugs/", "");;
                } else {
                    subs.link = '';
                }
                return subs
            })
            info.Substitute = (links ? links : "");
        }
        catch (err) {
            info.Substitute = [];
        }


        //logic here
        try {
            let missed_dose = document.getElementById("missed_dose")
            info.missed_dose = (missed_dose ? missed_dose.innerText : "").split("\n").slice(1);
        }
        catch (err) {
            info.missed_dose = [];
        }



        //logic here
        try {
            let updateDate = document.querySelector('.style__border-bottom___2ZMDB.style__last-updated___1EMgB')
            info.updateDate = (updateDate ? updateDate.innerText : "").split("\n").slice(1);
        }
        catch (err) {
            info.updateDate = [];
        }



        //logic here
        try {
            let expert_advice = Array.from(document.getElementById("expert_advice").getElementsByClassName('ExpertAdviceItem__content___1Djk2'))
            let expert_adviceName = Array.from(document.getElementById("expert_advice").getElementsByClassName('ExpertAdviceItem__header___3GJKM'))
            if (expert_advice) {
                let Jsonexpert = expert_advice.map((element, index) => {
                    let expert_adviceJSON = {}
                    if (expert_adviceName[index]) {
                        expert_adviceJSON.name = expert_adviceName[index].innerText
                    }
                    expert_adviceJSON.list = element.innerText.split("\n")
                    return expert_adviceJSON
                })
                info.expert_advice = (Jsonexpert ? Jsonexpert : "");
            }
        }
        catch (err) {
            info.expert_advice = [];
        }



        //logic here
        try {
            let how_to_use = document.getElementById("how_to_use")
            info.how_to_use = (how_to_use ? how_to_use.innerText : "").split("\n").filter(function (e) { return e }).slice(1);

        }
        catch (err) {
            info.how_to_use = [];
        }


        //logic here
        try {
            let fact_box_left = Array.from(document.getElementById("fact_box").getElementsByClassName('DrugFactBox__col-left___znwNB DrugFactBox__black___5cVbb'))
            let fact_box_right = Array.from(document.getElementById("fact_box").getElementsByClassName('DrugFactBox__col-right___36e1P'))
            if (fact_box_left) {
                let Jsonfact = fact_box_left.map((element, index) => {
                    let fact_box_leftJSON = {}
                    fact_box_leftJSON.type = element.innerText
                    if (fact_box_right[index]) {
                        fact_box_leftJSON.discription = fact_box_right[index].innerText
                    }

                    return fact_box_leftJSON
                })
                info.fact_box = (Jsonfact ? Jsonfact : "");
            }
        }
        catch (err) {
            info.fact_box = [];
        }



        //logic here
        try {
            let safetyHeading = Array.from(document.getElementById("safety_advice").getElementsByClassName('DrugOverview__warning-top___UD3xX'))
            let safetyDiscription = Array.from(document.getElementById("safety_advice").getElementsByClassName('DrugOverview__content___22ZBX'))
            if (safetyHeading) {
                let safety = safetyHeading.map((element, index) => {
                    let safetyJSON = {}
                    safetyJSON.heading = element.innerText.split("\n")[0]
                    if (safetyDiscription[index]) {
                        //parent container also exists
                        index++
                        safetyJSON.discription = safetyDiscription[index].innerText
                    }

                    return safetyJSON
                })
                info.safety = (safety ? safety : "");
            }
        }
        catch (err) {
            info.safety = [];
        }


        //logic here
        try {
            let how_drug_works = Array.from(document.getElementById("how_drug_works").getElementsByClassName('DrugOverview__title___1OwgG'))
            let how_drug_works_discription = Array.from(document.getElementById("how_drug_works").getElementsByClassName('DrugOverview__content___22ZBX'))
            if (how_drug_works) {
                let Jsonwork = how_drug_works.map((element, index) => {
                    let how_drug_worksJSON = {}
                    how_drug_worksJSON.heading = element.innerText
                    if (how_drug_works_discription[index]) {
                        how_drug_worksJSON.discription = how_drug_works_discription[index].innerText
                    }
                    return how_drug_worksJSON
                })
                info.how_drug_works = (Jsonwork ? Jsonwork : "");
            }
        }
        catch (err) {
            info.how_drug_works = [];
        }



        //no logic here
        try {
            let side_effects = Array.from(document.getElementById("side_effects").getElementsByClassName('DrugOverview__title___1OwgG'))
            let side_effects_discription = Array.from(document.getElementById("side_effects").getElementsByClassName('DrugOverview__container___CqA8x'))
            if (side_effects) {
                let JsonsideEffect = side_effects.map((element, index) => {
                    let how_drug_worksJSON = {}
                    how_drug_worksJSON.heading = element.innerText
                    if (side_effects_discription[index]) {
                        how_drug_worksJSON.discription = side_effects_discription[index].innerText.split("\n")
                    }
                    return how_drug_worksJSON
                })
                info.side_effects = (JsonsideEffect ? JsonsideEffect : "");
            }
        }
        catch (err) {
            info.side_effects = [];
        }



        //logic here
        try {
            let drug_interaction = Array.from(document.getElementById("drug_interaction").getElementsByClassName('DrugInteraction__drug___1XyzI'))
            let drug_interaction_lvl = Array.from(document.getElementById("drug_interaction").getElementsByClassName('DrugInteraction__interaction___nPIkU DrugInteraction__threatning___Uapx9'))

            let Jsoninteraction = drug_interaction.map((element, index) => {
                let drug_interactionJSON = {}
                drug_interactionJSON.drug = element.innerText
                if (drug_interaction_lvl[index]) {
                    drug_interactionJSON.lvl = drug_interaction_lvl[index].innerText
                }
                return drug_interactionJSON
            })
            info.drug_interaction = (Jsoninteraction ? Jsoninteraction : []);
        }

        catch (err) {
            info.drug_interaction = [];
        }


        //no logic here use benifit
        try {
            let uses = Array.from(document.getElementById("uses_and_benefits").getElementsByClassName('DrugOverview__content___22ZBX'))
            let usesDiscription = Array.from(document.getElementById("uses_and_benefits").getElementsByClassName('DrugOverview__title___1OwgG'))
            let Jsonuses = uses.map((element, index) => {
                let usesJSON = {}
                if (usesDiscription[index]) {
                    usesJSON.heading = usesDiscription[index].innerText
                }
                usesJSON.list = element.innerText.split("\n")
                return usesJSON
            })
            info.uses = (Jsonuses ? Jsonuses : "");
        }
        catch (err) {
            info.uses = [];
        }




        return info
    })
}

module.exports = { pageEvaluate };