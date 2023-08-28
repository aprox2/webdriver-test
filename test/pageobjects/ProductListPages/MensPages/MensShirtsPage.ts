import ProductListPage from "../ProductListPage";

class MensShirtsPage extends ProductListPage{

    constructor() {
        super();
        this.path = '/men/shirts/cat/?cid=3602'
    }

}

module.exports = new MensShirtsPage();
