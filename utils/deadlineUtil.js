exports.getDeadlineObject = (examType) => {
    switch (examType) {
        case "redo":
            return {
                "startDate": process.env.REDO_START_DATE,
                "endDate": process.env.REDO_END_DATE
            }
        case "reassesment":
            return {
                "startDate": process.env.REASSESMENT_START_DATE,
                "endDate": process.env.REASSESMENT_END_DATE
            }
        case "formative-assesment":
            return {
                "startDate": process.env.FORMATIVE_ASSESMENT_START_DATE,
                "endDate": process.env.FORMATIVE_ASSESMENT_END_DATE
            }
        default:
            return {
                "startDate": process.env.REDO_START_DATE,
                "endDate": process.env.REDO_END_DATE
            }
    }
}