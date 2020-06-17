exports.getDeadlineObject = (examType) => {
    let deadline = {
        "redo": {
            "startDate": process.env.REDO_START_DATE,
            "endDate": process.env.REDO_END_DATE
        },
        "reassesment": {
            "startDate": process.env.REASSESMENT_START_DATE,
            "endDate": process.env.REASSESMENT_END_DATE
        },
        "formative-assesment": {
            "startDate": process.env.FORMATIVE_ASSESMENT_START_DATE,
            "endDate": process.env.FORMATIVE_ASSESMENT_END_DATE
        }
    }
    if (examType) return deadline[examType];
    else return deadline;
}