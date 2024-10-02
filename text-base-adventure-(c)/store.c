#include <stdio.h>
#include <stdlib.h>

#include "inventory.h"
#include "clear.h"
#include "colour.h"

extern int inventory[], hp, dmg; // sword 0, gold 1, HP potion 2, mana potion 3, spell 4

void general() // mana potion
{
  char choice[1];
  
  choice[0] = 'a';

  clrscr();

  printf("You enter the General Goods store\n");
  
  while ((choice[0] != 'b') || (choice[0] != 'B'))
  {
    
    printf("You have ");
    yellow();
    printf("%d Gold\n", inventory[1]);
    reset();
    printf("What would you like to buy?\n\n");

    printf("HP potion (H) - ");
    yellow();
    printf("10 Gold\n");
    reset();

    printf("Mana potion (M) - ");
    yellow();
    printf("15 Gold\n\n");
    reset();

    printf("Back (B) to leave\n");
    printf("select an option: ");
    scanf(" %c", &choice[0]);

    if ((choice[0] == 'h') || (choice[0] == 'H'))
    {
      if (inventory[1] >= 10)
      {
        inventory[1] -= 10;
        inventory[2] += 1;
      }
      else
      {
        printf("\nYou dont have enough ");
        yellow();
        printf("Gold\n");
        reset();
      }
    }
    else if ((choice[0] == 'm') || (choice[0] == 'M'))
    {
      if (inventory[1] >= 15)
      {
        inventory[1] -= 15;
        inventory[3] += 1;
      }
      else
      {
        printf("\nYou dont have enough ");
        yellow();
        printf("Gold\n");
        reset();
      }
    }
    else if ((choice[0] == 'b') || (choice[0] == 'B'))
    {
      clrscr();
      return;
    }
    else
    {
      printf("Invalid option\n");
    }

    printf("\n\n");
    yellow();
    for (int i=0; i<60; i++)
    {
      printf("-");
    }
    reset();
    printf("\n\n");
  }
  return;
}

void blacksmith() // sword
{
  char choice[1];

  choice[0] = 'a';

  clrscr();

  printf("You enter the Blacksmith\n");

  while ((choice[0] != 'b') || (choice[0] != 'B'))
  {
    printf("You have ");
    yellow();
    printf("%d Gold\n\n", inventory[1]);
    reset();

    printf("Sword [S] - ");
    yellow();
    printf("25 Gold\n\n");
    reset();

    printf("Back (B) to leave\n");

    printf("select an option: ");
    scanf(" %c", &choice[0]);

    if ((choice[0] == 's') || (choice[0] == 'S'))
    {
      if (inventory[1] >= 25)
      {
        inventory[1] -=25;
        inventory[0] = 1;
        dmg = 5;
      }
      else
      {
        printf("\nYou dont have enough ");
        yellow();
        printf("Gold\n");
        reset();
      }
    }
    else if ((choice[0] == 'b') || (choice[0] == 'B'))
    {
      clrscr();
      return;
    }
    else
    {
      printf("Invalid option\n");
    }

    printf("\n\n");
    yellow();
    for (int i=0; i<60; i++)
    {
      printf("-");
    }
    reset();
    printf("\n\n");
  }
  return;
}

void hospital() // full heal
{
  char choice[1];
  extern int hp;
  
  choice[0] = 'a';

  clrscr();

  printf("You enter the Hospital\n");

  while ((choice[0] != 'b') || (choice[0] != 'B'))
  {
    printf("Your HP is at ");
    green();
    printf("%d\n\n", hp);
    reset();

    printf("You have ");
    yellow();
    printf("%d Gold\n\n", inventory[1]);
    reset();

    printf("Restore HP (H) - ");
    yellow();
    printf("2 Gold\n\n");
    reset();

    printf("Back (B) to leave\n");
    printf("select an option: ");
    scanf(" %c", &choice[0]);

    if ((choice[0] == 'h') || (choice[0] == 'H'))
    {
      if (inventory[1] >= 2)
      {
        inventory[1] -=2;
        hp = 50;
      }
      else
      {
        printf("\nYou dont have enough ");
        yellow();
        printf("Gold\n");
        reset();
      }
    }
    else if ((choice[0] == 'b') || (choice[0] == 'B'))
    {
      clrscr();
      return;
    }
    else
    {
      printf("Invalid option\n");
    }

    printf("\n\n");
    yellow();
    for (int i=0; i<60; i++)
    {
      printf("-");
    }
    reset();
    printf("\n\n");
  }
  return;
}
