#include <iostream>
#include <fstream>
#include <cmath>

using namespace std;


long arr[10001];



int main() {


    long n;
    long long k;
    long se[2] = {0,0};//start end


    ifstream mstr;
    mstr.open("query.txt" , ios::in);

    mstr >> n;
    mstr >> k;

    for(long i = 0 ; i < n ; i++) {
        mstr >> arr[i];
    }

    mstr.close();

    long long sum = 0;
    long long product = 1;


    while (se[1] < n) {


        while (product <= k / arr[se[1]] && !(k % arr[se[1]] == 0 && product == k / arr[se[1]])) {

            product *= arr[se[1]++];
            if(se[1] == n) {
                goto end;
            }
        }
        sum += se[1] - se[0];

        if (product == 1) {
            se[0]++;
            se[1]++;
        } else {
            product /= arr[se[0]++];
        }
    }


    end:

    sum += (se[1] - se[0])*(se[1] - se[0] + 1)/2;

    cout << sum << endl;




    return 0;
}