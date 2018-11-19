#include <iostream>
#include <fstream>

using namespace std;


long arr[10001];



int main() {


    long n;
    long long k;
    long se[2] = {0,1};//start end


    ifstream mstr;
    mstr.open("query.txt" , ios::in);

    mstr >> n;
    mstr >> k;

    for(long i = 0 ; i < n ; i++) {
        mstr >> arr[i];
    }

    mstr.close();

    long long sum = 0;
    unsigned long long product = arr[0];

    while (true) {

        while(product < k) {

            if(se[1] == n) {
                goto end;
            }

            product = product*arr[se[1]++];

        }


        product = product / arr[se[0]++];
        sum = sum + se[1] - se[0];
    }


    end:

    sum += (se[1] - se[0])*(se[1] - se[0] + 1)/2;

    cout << sum << endl;




    return 0;
}