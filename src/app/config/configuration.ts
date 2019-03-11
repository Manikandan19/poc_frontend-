const localhost = "http://localhost:8080";
const awshost = "http://poc-loadbalancer-1211585104.us-west-2.elb.amazonaws.com ";

export class Configuration {

    public host: any = null;

    set hostname(host) {
        if (host == 'localhost') {
            this.host = localhost;
        }
        else if (host == 'awshost') {
            this.host = awshost;
        }
        else {
            this.host = localhost;
        }
    }

    get hostname() {
        return this.host;
    }

}
