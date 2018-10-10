#include <iostream>
#include <string>
#include <algorithm>
#include <fstream>

using namespace std;

char str[100009];
long long querys[100000];
long long pos1[100009];
long long pos2[100009];
long long adress[100009];



int count(long length) {
    int c = 0;
    for ( char i = 97 ; i < 123 ; i++) {

        for (long j = 0 ; j < length ; j++){

            if(i == substr[j]){

                c++;
                break;
            }
        }
    }
    return c;
}

long letters (long length) {

    if( length == 0 ){ return 0; }
    if ( substr[length - 1] == 122 ) {

        return letters(--length);

    }

    substr[length - 1]++;
    return length;
}





int main(){

substr[0] = 97;
long n,q;
ifstream mstr;
mstr.open("query.txt" , ios::in);
long length = 0;
long long number = 0;
long cq = 0;

mstr >> n;
mstr >> q;

for(long i = 0 ; i < n ; i++){
    mstr >> str[i];
}

long i=0;

while(mstr >> querys[i++]){}

sort(querys,querys + q);




while (length >= 0){
   

}
while ( cq++ < q ){
    cout << -1 << endl;
}

return 0;

}
