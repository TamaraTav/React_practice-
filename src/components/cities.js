

function Cities() {
    const citiesList = ['თბილისი',"ქუთაისი","სამტრედია","რუსთავი","ჭიათურა","ზუგდიდი","თიანეთი"]
    return(
        <div> 
            <ul>
                {
                    citiesList.map((item,i) => (
                        <li key={i}>{item}</li>
                    ))
                }
                
            </ul>
        </div>
    );
}

export default Cities;