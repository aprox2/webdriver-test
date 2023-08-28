import ProductListPage from "../ProductListPage";


// Just an example class what MiscPages could be
class SearchPage extends ProductListPage{

    constructor() {
        super();
        this.path = '/search/'
    }



}

module.exports = new SearchPage();
