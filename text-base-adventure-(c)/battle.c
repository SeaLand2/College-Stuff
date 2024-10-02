#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>

#include "battle.h"
#include "colour.h"
#include "clear.h"
#include "inventory.h"

int battle(int hp, int dmg, int mana, int magic, char* ename)
{
  int enemy_hp=0, enemy_dmg=0, enemy_dmg_max, error=0, enemy_action=0, wizd_atk=0, enemy_mana = 100, amount = 0, use = 0, bribe = 5, temp_dmg;
  char action[1], item[1];
  char* reward = "";

  extern int inventory;
  //if inventory[0] == 1)

  clrscr();

  // define enemy stats
  if (strncmp(ename, "skel", 4) == 0)
  {
    ename = "skeleton";
    enemy_hp = 5, enemy_dmg = 1;
    reward = "gold";
    amount = 1;
  }
  else if (strncmp(ename, "wolf", 4) == 0)
  {
    ename = "wolf";
    enemy_hp = 10, enemy_dmg = 1;
    reward = "gold";
    amount = 5;
  }
  else if (strncmp(ename, "band", 4) == 0)
  {
    ename = "bandit";
    enemy_hp = 15, enemy_dmg = 2;
    reward = "gold";
    amount = 20;
  }
  else if (strncmp(ename, "bats", 4) == 0)
  {
    ename = "bat";
    enemy_hp = 5, enemy_dmg = 3;
    reward = "gold";
    amount = 10;
  }
  else if (strncmp(ename, "wizd", 4) == 0)
  {
    ename = "wizard";
    enemy_hp = 10, enemy_dmg = 0;
    // reward added in battle
  }
  else if (strncmp(ename, "boss", 4) == 0)
  {
    ename = "boss";
    enemy_hp = 50, enemy_dmg = 5;
  }
  else if (strncmp(ename, "trol", 4) == 0)
  {
    ename = "troll";
    enemy_hp = 30, enemy_dmg = 2;
    reward = "gold";
    amount = 50;
  }

  printf("You are fighting a ");
  red();
  printf("%s\n\n", ename);
  reset();

  // battle begins
  while ((hp > 0) && (enemy_hp > 0))
  {
    int dmg_roll;
    error = 0;

    printf("Your HP is at ");
    green();
    printf("%d\n", hp);
    reset();

    printf("Enemy HP is at ");
    green();
    printf("%d\n\n", enemy_hp);
    reset();

    if ((magic == 1) || (magic == 2))
    {
      printf("You have ");
      cyan();
      printf("%d ", mana);
      reset();
      printf("mana\n\n");
    }

    printf("Attack (A), Magic (M), Item (I)\n");

    printf("Choose an action ");
    scanf(" %c", action);

    // players turn
    if ((action[0] == 'A') || (action[0] == 'a'))
    {
      // add damage rolls
      dmg_roll = rand() % 4;

      enemy_hp -= (dmg + dmg_roll);
    }

    else if ((action[0] == 'I') || (action[0] == 'i'))
    {
      inv_see();
      printf("What item do you want to use?");
      scanf(" %c", &item[0]);
      use = inv_use(&item[0], 1); // sword, gold, HP potion, mana potion, spell
      
      switch(use) // skip enemy turn
      {
        case 0:
          printf("Invalid option\n");
          error = 1;
          break;
        case 1: // gold
          printf("You used gold\n");
          if ((strncmp(ename, "band", 4) == 0) && (bribe != 0))
          {
            printf("The bandit accepts your coin\n");
            bribe -= 1;
          }
          else if ((strncmp(ename, "band", 4) == 0) && (bribe == 0)) 
          {
            printf("You bribed the enemy to let you pass\n");
            enemy_hp = 0;
          }
          else
          {
            printf("The enemy takes no notice of your bribe\n");
          }
          break;
        case 2: // HP potion
          printf("You used ");
          green();
          printf("HP");
          reset();
          printf(" potion\n");
          hp += 10;
          break;
        case 3: // Mana potion
          printf("You used ");
          cyan();
          printf("Mana");
          reset();
          printf(" potion\n");
          mana += 10;
          break;
        default:
          break;
      }
    }

    else if ((action[0] == 'M') || (action[0] == 'm'))
    {
      // FINISH WHEN MAGIC IS DONE
      if (magic == 0)
      {
        printf("You dont have any magic yet\n");
        error = 1; // skips enemy turn since user cannot do anything
      }
    
      else if (magic == 1)
      {
        printf("You used ");
        purple();
        printf("fireball\n");
        reset();
        enemy_hp -= 10;
        mana -= 10;
      }

      else if (magic == 2)
      {
        printf("You used ");
        green();
        printf("healing\n");
        reset();
        hp += 10;
        mana -= 10;
      }
    }

    else
    {
      error = 1; // invalid input used to skip the enemies turn
    }

    // enemy turn. actions determined through rand()
    if (error == 0)
    {


      if (strncmp(ename, "wizd", 4) == 0)
      {
        wizd_atk = rand() % 3;
        
        if (wizd_atk == 0) // wizard fireball
        {
          hp -= 5;
          enemy_mana -= 10;
        }
        else
        {
          enemy_hp += 10;
          enemy_mana -= 10;
        }
      }

      else
      {
        dmg_roll = rand() % 6;
        temp_dmg = dmg_roll + enemy_dmg;
        hp -= temp_dmg;
      }

    }

    clrscr();
  }

  // rewards
  if (enemy_hp <= 0)
  {
    if (enemy_mana == 0)
      reward = "spel";
    
    inv_add(reward, amount);
  }

  if (hp > 0)
  {
    printf("You have ");
    yellow();
    printf("WON "); 
    reset();
    printf("the battle\n");

    printf("You earned %d %s\n\n", amount, reward);
  }
  else
  {
    printf("You have ");
    red();
    printf("DIED");
    reset();
  }
  
  return hp;
}